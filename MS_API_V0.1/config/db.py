from pymongo import MongoClient

client = MongoClient("mongodb://admin:filmdump@filmdump-mongo-1")
conn = client.filmdump.movies




