from pydantic import BaseModel

class Image(BaseModel):
    id: str
    url: str
    description: str
    altText: str
    tags: List[str]