from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Zola Backend API",
    description="Backend API for Zola travel planning application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response models
class ZolaResponse(BaseModel):
    status: str
    data: Dict[str, Any]

# API Endpoints
@app.get("/", response_model=ZolaResponse)
async def root():
    """Root endpoint - Hello World"""
    return ZolaResponse(
        message="Hello from Zola Backend API!",
        status="success",
        data={
            "version": "1.0.0",
            "service": "Zola Backend",
            "endpoints": {
                "hello": "/hello",
                "health": "/health",
                "docs": "/docs"
            }
        }
    )

# Run the application
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
