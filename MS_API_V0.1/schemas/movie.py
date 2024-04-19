def movieEntity(movie) -> dict:
    return {
       # "id": movie["_id"],
        "title": movie["title"],
        "director": movie["director"],
        "year": movie["year"],
        "genre": movie["genre"],
        "rating": movie["rating"]
    }


def moviesEntity(movies) -> list:
    return [movieEntity(movie) for movie in movies]

