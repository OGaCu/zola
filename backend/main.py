from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import uvicorn

from actions.unsplashActions import UnsplashAction
from actions.openAiActions import OpenAiActions
from schema.Plan import Plan

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
    
@app.get("/get-random-images", response_model=ZolaResponse)
async def get_random_images():
    try:
        random_images = UnsplashAction.get_random_images()
        return ZolaResponse(
            status="success",
            data={"images": random_images}
        )
    except Exception as e:
        return ZolaResponse(
            status="error",
            data={"error": str(e)}
        )

@app.get("/get-images", response_model=ZolaResponse)
async def get_images(request_data: Dict[str, Any]):
    """Get multiple images from Unsplash"""
    # request_data:
    # {query: string}
    try:
        images = UnsplashAction.get_images(request_data["query"])
        return ZolaResponse(
            status="success",
            data={"images": images}
        )
    except Exception as e:
        return ZolaResponse(
            status="error",
            data={"error": str(e)}
        )

@app.post("/create-itinerary", response_model=ZolaResponse)
async def createItinerary(request_data: Dict[str, Any]):
    """Create itinerary based on plan data"""
    try:
        # Convert request data to Plan object
        plan = Plan(**request_data)
        itinerary = OpenAiActions.createItinerary(plan)
        return ZolaResponse(
            status="success",
            data={"itinerary": itinerary}
        )
    except Exception as e:
        return ZolaResponse(
            status="error",
            data={"error": str(e)}
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
