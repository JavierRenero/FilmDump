from pydantic import BaseModel
from typing import Optional

class Movie(BaseModel):
   """
   Represents a movie.

   Attributes:
      id (Optional[str]): The unique identifier of the movie.
      title (str): The title of the movie.
      director (str): The director of the movie.
      year (int): The year the movie was released.
      genre (str): The genre of the movie.
      rating (float): The rating of the movie.
   """
   id: Optional[str]
   title: str
   director: str
   year: int
   genre: str
   rating: float