from bson import ObjectId
from fastapi import APIRouter, status,Response
from bson import ObjectId
from starlette.status import HTTP_204_NO_CONTENT

from models.movie import Movie
from config.db import conn
from schemas.movie import movieEntity, moviesEntity

movie = APIRouter()


@movie.get('/movies', response_model=list[Movie], tags=["Movies"])
async def find_all_movies():
    return moviesEntity(conn.find())


@movie.post('/movies', response_model=Movie, tags=["Movies"])
async def create_movie(movie: Movie):
    new_movie = dict(movie)
    del new_movie["id"]
    id = conn.insert_one(new_movie).inserted_id
    movie = conn.find_one({"_id": id})
    return movieEntity(movie)


@movie.get('/movies/{title}', response_model=Movie, tags=["Movies"])
async def find_movie(title: str):
    return movieEntity(conn.find_one({"title": title}))


@movie.put("/movies/{title}", response_model=Movie, tags=["Movies"])
async def update_movie(title: str, movie: Movie):
    conn.find_one_and_update({
        "title": title
    }, {
        "$set": dict(movie)
    })
    return movieEntity(conn.find_one({"_id": ObjectId(movie["id"])}))


@movie.delete("/movies/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Movies"])
async def delete_movie(id: str):
    conn.find_one_and_delete({
        "_id": ObjectId(id)
    })
    return Response(status_code = HTTP_204_NO_CONTENT)
