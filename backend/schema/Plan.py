from pydantic import BaseModel

class Plan(BaseModel):
    dateFrom: str
    dateTo: str
    location: str
    numPeople: int
    budget: str
    mood: str
    