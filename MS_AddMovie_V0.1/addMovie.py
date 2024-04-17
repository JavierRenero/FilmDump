import json
from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class Movie(BaseModel):
    title: str
    director: str
    year: int
    genre: str
    rating: int

@app.post("/addMovie")
def add_movie(movies: List[Movie]):
    # Verify the data
    if not movies:
        raise HTTPException(status_code=400, detail="Invalid movie data")
    
    # Add the movies to the collection
    for movie in movies:
        print(f"Adding movie: {movie.title}")
        with open("movies.json", "a") as f:
            f.write(json.dumps(movie.dict()) + "\n")
    
    return {"message": "Movies added successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081)
