def movieEntity(movie) -> dict:
    """
    Convert a movie document into a dictionary representation.

    Args:
        movie (dict): The movie document.

    Returns:
        dict: The dictionary representation of the movie.
    """
    return {
        "id": str(movie["_id"]),
        "title": movie["title"],
        "director": movie["director"],
        "year": movie["year"],
        "genre": movie["genre"],
        "rating": movie["rating"]
    }


def moviesEntity(movies) -> list:
    """
    Convert a list of movie documents into a list of dictionary representations.

    Args:
        movies (list): The list of movie documents.

    Returns:
        list: The list of dictionary representations of the movies.
    """
    return [movieEntity(movie) for movie in movies]
