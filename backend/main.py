from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MetaSense AI API",
    description="Backend for MetaSense AI - Voice-Driven Metadata Intelligence Platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to MetaSense AI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include Routers
from database import engine
from models import Base
from routers import documents, metadata

Base.metadata.create_all(bind=engine)

app.include_router(documents.router)
app.include_router(metadata.router)

