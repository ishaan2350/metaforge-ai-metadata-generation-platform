from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
# from models import MetadataRecord

router = APIRouter(
    prefix="/metadata",
    tags=["metadata"],
)

@router.get("/{document_id}")
async def get_metadata(document_id: int):
    # TODO: Fetch from DB
    return {"document_id": document_id, "title": "Mock Title"}
