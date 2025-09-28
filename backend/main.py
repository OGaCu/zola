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
            "service": "Created with love by Andrew, Gia, and Rachel",
        }
    )
    
@app.get("/get-random-images", response_model=ZolaResponse)
async def get_random_images():
    try:
        # Try to load saved images first, fallback to API if none available
        saved_images = UnsplashAction.load_saved_images(40)
        if saved_images:
            return ZolaResponse(
                status="success",
                data={"images": saved_images}
            )
        else:
            # Fallback to API if no saved images
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
async def get_images(query: str):
    """Get multiple images from Unsplash based on search query"""
    try:
        images = UnsplashAction.get_images(query)
        return ZolaResponse(
            status="success",
            data={"images": images}
        )
    except Exception as e:
        return ZolaResponse(
            status="error",
            data={"error": str(e)}
        )

@app.post("/pin-image", response_model=ZolaResponse)
async def pin_image(request_data: Dict[str, Any]):
    """Pin an image and fetch its tags"""
    try:
        image_id = request_data.get('imageId')
        if not image_id:
            return ZolaResponse(
                status="error",
                data={"error": "imageId is required"}
            )
        
        # Fetch tags for the pinned image
        tags = UnsplashAction.get_photo_tags(image_id)
        
        return ZolaResponse(
            status="success",
            data={"imageId": image_id, "tags": tags}
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
    # Check if saved_images folder is empty and populate if needed
    import os
    saved_images_dir = os.path.join(os.path.dirname(__file__), 'saved_images')
    
    # Check if we need to populate images (goal: 150 images)
    existing_folders = []
    if os.path.exists(saved_images_dir):
        existing_folders = [f for f in os.listdir(saved_images_dir) if f.startswith('image_')]
    
    if len(existing_folders) < 150:
        print(f"🔄 Need to populate images (current: {len(existing_folders)}, target: 150)...")
        saved_count = UnsplashAction.save_images()
        if saved_count > 0:
            print(f"✅ Successfully saved {saved_count} images for startup")
        else:
            print("❌ Failed to save images, will use API fallback")
    else:
        print(f"✅ Saved images folder has {len(existing_folders)} images, ready to serve")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
