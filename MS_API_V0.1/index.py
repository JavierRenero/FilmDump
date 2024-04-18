from fastapi import FastAPI
from routes.movie import movie
import uvicorn

app = FastAPI(
  title="FastAPI & MongoDB",
  description="this is a simple REST API using fastapi and mongodb by Javier",
  version="0.1",
)

app.include_router(movie)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081)