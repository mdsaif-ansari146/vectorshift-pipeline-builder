# VectorShift Pipeline Builder

A visual drag-and-drop AI pipeline builder built with React Flow and FastAPI.

## Features
- ⚡ Node abstraction with BaseNode component
- 🔷 9 node types: Input, Output, LLM, Text, API Call, Filter, Condition, Math, Note
- 📝 Dynamic {{variable}} handles on Text node
- 📐 Auto-resize Text node as you type
- ✅ DAG validation via FastAPI backend using Kahn's Algorithm
- 🎨 Unified styled UI with color-coded nodes

## Tech Stack
- React + React Flow
- Zustand (state management)
- Python + FastAPI
- Uvicorn

## Run the project

### Backend
cd backend
python -m uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm start

Frontend runs on http://localhost:3000
Backend runs on http://localhost:8000
