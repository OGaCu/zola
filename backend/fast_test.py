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

# Pydantic models for activity planning
class ActivityRequest(BaseModel):
    activity_date: date = Field(..., description="Date for the activity")
    location: str = Field(..., min_length=1, description="Location for the activity")
    number_of_people: int = Field(..., ge=1, le=50, description="Number of people (1-50)")
    mood: Mood = Field(..., description="Mood type: chill, energetic, or adventurous")
    additional_notes: Optional[str] = Field(None, description="Additional notes or preferences")

class ActivityResponse(BaseModel):
    id: int
    activity_date: date
    location: str
    number_of_people: int
    mood: Mood
    additional_notes: Optional[str]
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
        activity_date=activity.activity_date,
        location=activity.location,
        number_of_people=activity.number_of_people,
        mood=activity.mood,
        additional_notes=activity.additional_notes,
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
    filtered_activities = [activity for activity in activities_db if activity.activity_date == activity_date]
    return filtered_activities

@app.get("/activities/people/{min_people}/{max_people}", response_model=List[ActivityResponse])
async def get_activities_by_group_size(min_people: int, max_people: int):
    """Get all activities filtered by group size range"""
    filtered_activities = [
        activity for activity in activities_db 
        if min_people <= activity.number_of_people <= max_people
    ]
    return filtered_activities

@app.get("/activities/search")
async def search_activities(
    mood: Optional[Mood] = None,
    location: Optional[str] = None,
    min_people: Optional[int] = None,
    max_people: Optional[int] = None,
    activity_date: Optional[date] = None
):
    """Advanced search with multiple filters"""
    filtered_activities = activities_db.copy()
    
    if mood:
        filtered_activities = [a for a in filtered_activities if a.mood == mood]
    
    if location:
        filtered_activities = [a for a in filtered_activities if location.lower() in a.location.lower()]
    
    if min_people:
        filtered_activities = [a for a in filtered_activities if a.number_of_people >= min_people]
    
    if max_people:
        filtered_activities = [a for a in filtered_activities if a.number_of_people <= max_people]
    
    if activity_date:
        filtered_activities = [a for a in filtered_activities if a.activity_date == activity_date]
    
    return {
        "filters_applied": {
            "mood": mood,
            "location": location,
            "min_people": min_people,
            "max_people": max_people,
            "activity_date": activity_date
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
    
    for activity in activities_db:
        mood_counts[activity.mood] = mood_counts.get(activity.mood, 0) + 1
        location_counts[activity.location] = location_counts.get(activity.location, 0) + 1
    
    return {
        "total_activities": len(activities_db),
        "mood_distribution": mood_counts,
        "location_distribution": location_counts,
        "average_group_size": sum(activity.number_of_people for activity in activities_db) / len(activities_db) if activities_db else 0,
        "date_range": {
            "earliest": min(activity.activity_date for activity in activities_db) if activities_db else None,
            "latest": max(activity.activity_date for activity in activities_db) if activities_db else None
        }
    }


if __name__ == "__main__":
    # Run the server
    uvicorn.run(app, host="0.0.0.0", port=8000)
