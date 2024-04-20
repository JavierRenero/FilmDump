from pymongo import MongoClient

client = MongoClient("mongodb://admin:filmdump@filmdump-mongo-1")
conn = client.filmdump.movies

"""
This module provides a connection to the MongoDB database for the FilmDump application.

The `client` variable represents the MongoDB client object that connects to the database server.
The `conn` variable represents the collection object for the 'movies' collection in the 'filmdump' database.

Example usage:
    # Connect to the MongoDB database
    client = MongoClient("mongodb://admin:filmdump@filmdump-mongo-1")

    # Access the 'movies' collection
    conn = client.filmdump.movies
"""
