from tracemalloc import start
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
    styles: List[str] = [] # 
    trip_types: List[str] = []
    web_url: Optional[str] = None
    photo_url: Optional[str] = None

