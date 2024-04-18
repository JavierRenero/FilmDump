def movieEntity(movie) -> dict:
    return {
        "id": str(movie["_id"]),
        "title": movie["title"],
        "director": movie["director"],
        "year": movie["year"],
        "genre": movie["genre"],
        "rating": movie["rating"]
    }


def moviesEntity(movies) -> list:
    return [movieEntity(movie) for movie in movies]

def serializeDict(a) -> dict:
    return {**{i: str(a[i]) for i in a if i == '_id'}, **{i: a[i] for i in a if i != '_id'}}


def serializeList(movies) -> list:
    return [serializeDict(a) for a in movies]
