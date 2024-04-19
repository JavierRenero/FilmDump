from bson import ObjectId
from fastapi import APIRouter, status,Response
from bson import ObjectId
from typing import Optional
from starlette.status import HTTP_204_NO_CONTENT

from models.movie import Movie
from config.db import conn
from schemas.movie import movieEntity, moviesEntity,serializeList
from typing import List

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

@movie.get('/movies/filter/', response_model=list[Movie], tags=["Movies"])
async def filter_movies(title: str = None, director: str = None, year: int = None, rating: int = None, genre: str = None):  
    query = {}
    if title is not None:
        query["title"] = title
    if director is not None:
        query["director"] = director
    if year is not None:
        query["year"] = year
    if rating is not None:
        query["rating"] = rating
    if genre is not None:
        query["genre"] = genre
    return moviesEntity(conn.find(query))

@movie.delete("/movies/{title}", status_code=status.HTTP_204_NO_CONTENT, tags=["Movies"])
async def delete_movie(title: str):
    conn.find_one_and_delete({
        "title": title
    })
    return Response(status_code = HTTP_204_NO_CONTENT)
