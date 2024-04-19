from pydantic import BaseModel

class Movie(BaseModel):
   # id: Optional[str]
    title: str
    director: str
    year: int
    genre: str
    rating: float