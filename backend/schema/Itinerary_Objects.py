from pydantic import BaseModel
from typing import List, Optional

class Location(BaseModel):
    """
    Represents a TripAdvisor location (hotel, attraction, restaurant).
    """
    location_id: str
    name: str
    category: str                          # hotel, restaurant, attraction
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    price_level: Optional[str] = None
    rating: Optional[float] = None
    amenities: List[str] = []
    styles: List[str] = []
    trip_types: List[str] = []
    web_url: Optional[str] = None
    photo_url: Optional[str] = None


class DayPlan(BaseModel):
    """
    Represents a single day of the itinerary.
    """
    id: str # DayPlan_id
    day_number: int
    date: str                           # "YYYY-MM-DD"
    hotels: List[Location] = []
    attractions: List[Location] = []
    restaurants: List[Location] = []
    notes: str = ""                     # optional notes for the day


class Itinerary(BaseModel):
    """
    Represents the entire trip itinerary.
    """
    title: str                          # e.g. "California Road Trip"
    start_date: str                     # "YYYY-MM-DD"
    end_date: str                       # "YYYY-MM-DD"
    day_plans: List[DayPlan] = []
