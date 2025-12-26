from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class DocumentBase(BaseModel):
    filename: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    file_path: str
    created_at: datetime

    class Config:
        from_attributes = True

class MetadataBase(BaseModel):
    title_generated: Optional[str] = None
    summary: Optional[str] = None
    tags: Optional[str] = None
    confidence_score: Optional[float] = None

class MetadataCreate(MetadataBase):
    pass

class Metadata(MetadataBase):
    id: int
    document_id: int

    class Config:
        from_attributes = True
