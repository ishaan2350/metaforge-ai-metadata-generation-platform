import os
import shutil
from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session

from database import get_db
from models import Document, MetadataRecord, AuditLog
from rag_engine import rag_engine

router = APIRouter(
    prefix="/documents",
    tags=["documents"],
)

UPLOAD_DIR = "uploaded_files"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def process_document_background(file_path: str, document_id: int, user_id: int, db: Session):
    """
    Background task to process the document:
    1. Parse & Chunk
    2. Update Vector Store
    3. Generate Metadata
    4. Update DB
    """
    # Create a new session for the background task
    from database import SessionLocal
    bg_db = SessionLocal()
    
    try:
        # 1-2. Ingest into RAG Engine
        metadata = {"document_id": document_id, "user_id": user_id}
        extracted_text = rag_engine.ingest_document(file_path, metadata)
        
        # 3. Generate Analysis
        filename = os.path.basename(file_path)
        analysis = rag_engine.generate_metadata_analysis(extracted_text, filename)
        
        # 4. Save to DB
        new_meta = MetadataRecord(
            document_id=document_id,
            title_generated=analysis["title_generated"],
            summary=analysis["summary"],
            category=analysis["category"],
            tags=analysis["tags"],
            confidence_score=analysis["confidence_score"],
            relevance_score=analysis["relevance_score"]
        )
        bg_db.add(new_meta)
        
        # Log action
        log = AuditLog(
            user_id=1, # TODO: Real User
            action="METADATA_GENERATED",
            resource_type="document",
            resource_id=document_id,
            details=f"Generated metadata for {filename}"
        )
        bg_db.add(log)
        
        bg_db.commit()
        print(f"Successfully processed document {document_id}")
        
    except Exception as e:
        print(f"Error processing document {document_id}: {e}")
    finally:
        bg_db.close()

@router.post("/upload")
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    # 1. Save File Locally
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    # 2. Create Database Record
    # TODO: Get real user ID from auth
    new_doc = Document(
        filename=file.filename,
        file_path=file_location,
        file_type=file.filename.split('.')[-1],
        file_size=0, # TODO: Calculate size
        owner_id=1 
    )
    db.add(new_doc)
    
    # Log Upload
    # Ensure a user exists first (Hack for MVP)
    from models import User
    if not db.query(User).filter(User.id == 1).first():
       db.add(User(id=1, email="demo@metaforge.ai", hashed_password="hashed_secret"))
    
    db.commit()
    db.refresh(new_doc)
    
    # 3. Trigger Background Processing
    background_tasks.add_task(process_document_background, file_location, new_doc.id, 1, db)
    
    return {"id": new_doc.id, "filename": file.filename, "status": "Processing Started"}

@router.get("/", response_model=List[dict]) 
async def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).order_by(Document.created_at.desc()).all()
    return [{
        "id": d.id, 
        "name": d.filename, 
        "size": "1.2 MB", # Mock size for now
        "date": d.created_at.strftime("%Y-%m-%d %H:%M"), 
        "type": d.file_type.upper()
    } for d in docs]
