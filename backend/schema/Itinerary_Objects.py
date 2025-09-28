from dataclasses import dataclass, field
from typing import List

@dataclass
class Location:
    """
    Represents a TripAdvisor location (hotel, attraction, restaurant).
    """
    id: str # location_id
    name: str                 # e.g. "Venice Beach Boardwalk"
    address: str              # e.g. "1800 Ocean Front Walk, Venice, CA"
    latitude: float           # for mapping
    longitude: float
    rating: float = None       # TripAdvisor rating (optional)
    url: str = None            # TripAdvisor link (optional)
    category: str = None       # e.g. "hotel", "restaurant", "attraction"


@dataclass
class DayPlan:
    """
    Represents a single day of the itinerary.
    """
    id: str # DayPlan_id
    day_number: int
    date: str                           # "YYYY-MM-DD"
    hotels: List[Location] = field(default_factory=list)
    attractions: List[Location] = field(default_factory=list)
    restaurants: List[Location] = field(default_factory=list)
    notes: str = ""                     # optional notes for the day


@dataclass
class Itinerary:
    """
    Represents the entire trip itinerary.
    """
    title: str                          # e.g. "California Road Trip"
    start_date: str                     # "YYYY-MM-DD"
    end_date: str                       # "YYYY-MM-DD"
    day_plans: List[DayPlan] = field(default_factory=list)
