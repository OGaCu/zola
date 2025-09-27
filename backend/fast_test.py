from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, date
from enum import Enum
import uvicorn

# Create FastAPI instance
app = FastAPI(title="Activity Planning API", version="1.0.0")

# Enum for mood types
class Mood(str, Enum):
    CHILL = "chill"
    ENERGETIC = "energetic"
    ADVENTUROUS = "adventurous"
    RELAXING = "relaxing"

# Image model for the images array
class Image(BaseModel):
    id: str = Field(..., description="Unique identifier for the image")
    url: str = Field(..., description="URL of the image")
    description: str = Field(..., description="Description of the image")
    tags: List[str] = Field(..., description="Tags associated with the image")

# Pydantic models for activity planning
class ActivityRequest(BaseModel):
    dateFrom: datetime = Field(..., description="Start date and time for the activity")
    dateTo: datetime = Field(..., description="End date and time for the activity")
    location: str = Field(..., min_length=1, description="Location for the activity")
    numberOfPeople: int = Field(..., ge=1, le=50, description="Number of people (1-50)")
    budget: str = Field(..., description="Budget for the activity")
    mood: Mood = Field(..., description="Mood type: chill, energetic, adventurous, or relaxing")
    images: List[Image] = Field(..., description="List of images associated with the activity")

class ActivityResponse(BaseModel):
    id: int
    dateFrom: datetime
    dateTo: datetime
    location: str
    numberOfPeople: int
    budget: str
    mood: Mood
    images: List[Image]
    created_at: datetime

# In-memory storage (replace with database in production)
activities_db = []
activity_counter = 0

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to Activity Planning API", "status": "running"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Activity Planning API is running"}

# Activity endpoints
@app.post("/activities", response_model=ActivityResponse)
async def create_activity(activity: ActivityRequest):
    """Create a new activity request"""
    global activity_counter
    activity_counter += 1

    activity_response = ActivityResponse(
        id=activity_counter,
        dateFrom=activity.dateFrom,
        dateTo=activity.dateTo,
        location=activity.location,
        numberOfPeople=activity.numberOfPeople,
        budget=activity.budget,
        mood=activity.mood,
        images=activity.images,
        created_at=datetime.now()
    )
    
    activities_db.append(activity_response)
    return activity_response

@app.get("/activities", response_model=List[ActivityResponse])
async def get_activities():
    """Get all activity requests"""
    return activities_db

@app.get("/activities/{activity_id}", response_model=ActivityResponse)
async def get_activity(activity_id: int):
    """Get a specific activity by ID"""
    for activity in activities_db:
        if activity.id == activity_id:
            return activity
    raise HTTPException(status_code=404, detail="Activity not found")

@app.get("/activities/mood/{mood}", response_model=List[ActivityResponse])
async def get_activities_by_mood(mood: Mood):
    """Get all activities filtered by mood"""
    filtered_activities = [activity for activity in activities_db if activity.mood == mood]
    return filtered_activities

@app.get("/activities/location/{location}", response_model=List[ActivityResponse])
async def get_activities_by_location(location: str):
    """Get all activities filtered by location"""
    filtered_activities = [activity for activity in activities_db if location.lower() in activity.location.lower()]
    return filtered_activities

@app.get("/activities/date/{activity_date}", response_model=List[ActivityResponse])
async def get_activities_by_date(activity_date: date):
    """Get all activities filtered by date"""
    filtered_activities = [activity for activity in activities_db if activity.dateFrom.date() == activity_date]
    return filtered_activities

@app.get("/activities/people/{min_people}/{max_people}", response_model=List[ActivityResponse])
async def get_activities_by_group_size(min_people: int, max_people: int):
    """Get all activities filtered by group size range"""
    filtered_activities = [
        activity for activity in activities_db 
        if min_people <= activity.numberOfPeople <= max_people
    ]
    return filtered_activities

@app.get("/activities/search")
async def search_activities(
    mood: Optional[Mood] = None,
    location: Optional[str] = None,
    min_people: Optional[int] = None,
    max_people: Optional[int] = None,
    activity_date: Optional[date] = None,
    budget_min: Optional[str] = None,
    budget_max: Optional[str] = None
):
    """Advanced search with multiple filters"""
    filtered_activities = activities_db.copy()
    
    if mood:
        filtered_activities = [a for a in filtered_activities if a.mood == mood]
    
    if location:
        filtered_activities = [a for a in filtered_activities if location.lower() in a.location.lower()]
    
    if min_people:
        filtered_activities = [a for a in filtered_activities if a.numberOfPeople >= min_people]
    
    if max_people:
        filtered_activities = [a for a in filtered_activities if a.numberOfPeople <= max_people]
    
    if activity_date:
        filtered_activities = [a for a in filtered_activities if a.dateFrom.date() == activity_date]
    
    return {
        "filters_applied": {
            "mood": mood,
            "location": location,
            "min_people": min_people,
            "max_people": max_people,
            "activity_date": activity_date,
            "budget_min": budget_min,
            "budget_max": budget_max
        },
        "results": filtered_activities,
        "count": len(filtered_activities)
    }

# Stats endpoint
@app.get("/stats")
async def get_stats():
    """Get basic statistics"""
    mood_counts = {}
    location_counts = {}
    budget_counts = {}
    
    for activity in activities_db:
        mood_counts[activity.mood] = mood_counts.get(activity.mood, 0) + 1
        location_counts[activity.location] = location_counts.get(activity.location, 0) + 1
        budget_counts[activity.budget] = budget_counts.get(activity.budget, 0) + 1
    
    return {
        "total_activities": len(activities_db),
        "mood_distribution": mood_counts,
        "location_distribution": location_counts,
        "budget_distribution": budget_counts,
        "average_group_size": sum(activity.numberOfPeople for activity in activities_db) / len(activities_db) if activities_db else 0,
        "total_images": sum(len(activity.images) for activity in activities_db),
        "date_range": {
            "earliest_start": min(activity.dateFrom for activity in activities_db) if activities_db else None,
            "latest_end": max(activity.dateTo for activity in activities_db) if activities_db else None
        }
    }


if __name__ == "__main__":
    # Run the server
    uvicorn.run(app, host="0.0.0.0", port=8000)
