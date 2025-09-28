from pydantic import BaseModel
from typing import List, Optional

class Image(BaseModel):
    id: str
    url: str
    description: Optional[str] = ""
    altText: Optional[str] = ""
    tags: List[str]