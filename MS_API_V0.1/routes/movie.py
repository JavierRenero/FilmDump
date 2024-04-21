from fastapi import APIRouter, Response, status, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional
from starlette.status import HTTP_204_NO_CONTENT

from models.movie import Movie
from config.db import conn
from schemas.movie import movieEntity, moviesEntity


movie = APIRouter()


@movie.get("/movies", response_model=list[Movie], tags=["Movies"])
async def find_all_movies():
    """
    Retrieve all movies.

    Returns:
        A list of movies.
    """
    return JSONResponse(content={"movies": moviesEntity(conn.find())})


@movie.post("/movies", response_model=Movie, tags=["Movies"])
async def create_movie(movie: Movie):
    """
    Create a new movie.

    Args:
        movie: The movie data.

    Returns:
        The created movie.
    """
    movie_exist = conn.find_one({"title": movie.title})
    if movie_exist is not None:
        return HTTPException(409, "Movie already exists.")
    if "id" in movie:
        del movie["id"]
    new_movie = dict(movie)
    conn.insert_one(new_movie)
    return movieEntity(conn.find_one({"title": movie.title}))


@movie.get("/movies/{title}", response_model=Movie, tags=["Movies"])
async def find_movie(title: str):
    """
    Retrieve a movie by title.

    Args:
        title: The title of the movie.

    Returns:
        The movie with the specified title.
    """
    return movieEntity(conn.find_one({"title": title}))


@movie.put("/movies/{title}", response_model=Movie, tags=["Movies"])
async def update_movie(title: str, movie: Movie):
    """
    Update a movie by title.

    Args:
        title: The title of the movie.
        movie: The updated movie data.

    Returns:
        The updated movie.
    """
    conn.find_one_and_update({
        "title": title
    }, {
        "$set": dict(movie)
    })
    return movieEntity(conn.find_one({"title": title}))

@movie.get('/filter', response_model=list[Movie], tags=["Movies"])
async def filter_movies(title: Optional[str] = None, director: Optional[str] = None, year: Optional[int] = None, rating: Optional[float] = None, genre: Optional[str] = None, id: Optional[str] = None):  
    """
    Filter movies based on the specified criteria.

    Args:
        title: The title of the movie (optional).
        director: The director of the movie (optional).
        year: The year of the movie (optional).
        rating: The rating of the movie (optional).
        genre: The genre of the movie (optional).
        id: The ID of the movie (optional).

    Returns:
        A list of filtered movies.
    """
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
    if id is not None:
        query["_id"] = id
    return moviesEntity(conn.find(query))

@movie.get("/genres", tags=["Movies"])
async def get_all_genres():
    """
    Retrieve all genres.

    Returns:
        A list of genres.
    """
    movies = conn.find()
    genres = set()
    for movie in movies:
        movie_genres = movie.get('genre', '').split(',')
        for genre in movie_genres:
            genres.add(genre.strip())
    return JSONResponse(content={"genres": list(genres)})

        
@movie.delete("/movies/{title}", status_code=status.HTTP_204_NO_CONTENT, tags=["Movies"])
async def delete_movie(title: str):
    """
    Delete a movie by title.

    Args:
        title: The title of the movie.

    Returns:
        HTTP 204 No Content.
    """
    conn.find_one_and_delete({
        "title": title
    })
    return Response(status_code = HTTP_204_NO_CONTENT)
