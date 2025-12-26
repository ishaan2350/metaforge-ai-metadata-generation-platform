# MetaSense AI (Metaforge)

MetaSense AI is a voice-driven metadata intelligence platform. This repository contains the source code for both the frontend (Next.js) and backend (FastAPI).

## Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (Optional)

## Project Structure
- `/frontend`: Next.js 14 application with Tailwind CSS and Framer Motion.
- `/backend`: FastAPI application with SQLAlchemy and LangChain.

## Getting Started

### 1. Backend Setup
```bash
cd backend
# Create virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Server
uvicorn main:app --reload
```
API will be running at `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Run Development Server
npm run dev
```
Application will be running at `http://localhost:3000`.

## Features Implemented
- **Landing Page**: High-impact UI with animations.
- **Dashboard**: Professional layout with Sidebar, Topbar, and Analytics Overview.
- **AI Assistant**: Floating voice-enabled assistant (UI mock).
- **Backend API**: Skeleton for Document and Metadata management.
- **Database**: PostgreSQL schema designed (SQLAlchemy models).
