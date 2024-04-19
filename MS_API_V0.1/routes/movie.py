from fastapi import APIRouter, Response, status
from fastapi.responses import JSONResponse
from typing import Optional
from starlette.status import HTTP_204_NO_CONTENT

from models.movie import Movie
from config.db import conn
from schemas.movie import movieEntity, moviesEntity


movie = APIRouter()


@movie.get("/movies", response_model=list[Movie], tags=["Movies"])
async def find_all_movies():
    return moviesEntity(conn.find())


@movie.post("/movies", response_model=Movie, tags=["Movies"])
async def create_movie(movie: Movie):
    new_movie = dict(movie)
    #del new_movie["id"]
    conn.insert_one(new_movie)
    movie = conn.find_one({"title": movie.title})
    return movieEntity(movie)


@movie.get("/movies/{title}", response_model=Movie, tags=["Movies"])
async def find_movie(title: str):
    return movieEntity(conn.find_one({"title": title}))


@movie.put("/movies/{title}", response_model=Movie, tags=["Movies"])
async def update_movie(title: str, movie: Movie):
    conn.find_one_and_update({
        "title": title
    }, {
        "$set": dict(movie)
    })
    return movieEntity(conn.find_one({"title": title}))

@movie.get('/filter', response_model=list[Movie], tags=["Movies"])
async def filter_movies(title: Optional[str] = None, director: Optional[str] = None, year: Optional[int] = None, rating: Optional[int] = None, genre: Optional[str] = None):  
    query = {}
    if title is not None:
        query["title"] = {"$regex": title, "$options": "i"}
    if director is not None:
        query["director"] = {"$regex": director, "$options": "i"}
    if year is not None:
        query["year"] = year
    if rating is not None:
        query["rating"] = rating
    if genre is not None:
        query["genre"] = {"$regex": genre, "$options": "i"}
    return moviesEntity(conn.find(query))

@movie.get("/genres", tags=["Movies"])
async def get_all_genres():
    movies = conn.find()
    genres = set()
    for movie in movies:
        movie_genres = movie.get('genre', '').split(',')
        for genre in movie_genres:
            genres.add(genre.strip())
    return JSONResponse(content={"genres": list(genres)})
        
@movie.delete("/movies/{title}", status_code=status.HTTP_204_NO_CONTENT, tags=["Movies"])
async def delete_movie(title: str):
    conn.find_one_and_delete({
        "title": title
    })
    return Response(status_code = HTTP_204_NO_CONTENT)
