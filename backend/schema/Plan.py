from pydantic import BaseModel
from typing import List

class Plan(BaseModel):
    dateFrom: str
    dateTo: str
    location: str
    numPeople: int
    budget: str
    mood: str
    