from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pymongo
import uvicorn

app = FastAPI()

class Movie(BaseModel):
    title: str
    director: str
    year: int
    genre: str
    rating: int

# Connect to MongoDB
client = pymongo.MongoClient('mongo-1',5050)
db = client["film_dump"]
collection = db["movies"]

@app.post("/addMoviedb")
def add_movie(movies: List[Movie]):
    print(client.list_database_names())
    print(db.list_collection_names())
    # Verify the data
    if not movies:
        raise HTTPException(status_code=400, detail="Invalid movie data")

    # Check if the collection exists
    if "movies" not in db.list_collection_names():
        db.create_collection("movies")

    # Add the movies to the collection
    for movie in movies:
        collection.insert_one(movie.dict())

    return {"message": "Movies added successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081)
