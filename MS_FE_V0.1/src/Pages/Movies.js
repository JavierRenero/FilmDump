/**
 * Movies component displays a list of movies and provides filtering options.
 * @returns {JSX.Element} The rendered Movies component.
 */
import React, { useState, useEffect } from "react";
import { img_300, unavailable } from "../Components/config";
import { fetchMovies } from "../Components/api";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [state, setState] = useState([]); // store the fetched data
  const [titleFilter, setTitleFilter] = useState("");
  const [directorFilter, setDirectorFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [showTitleFilter, setShowTitleFilter] = useState(false);
  const [showDirectorFilter, setShowDirectorFilter] = useState(false);
  const [showYearFilter, setShowYearFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [showGenreFilter, setShowGenreFilter] = useState(false);
  const [error, setError] = useState(null); // store the fetch error
  const navigate = useNavigate();

  /**
   * Fetches the movies data from the server.
   * @returns {Promise<void>} A promise that resolves when the data is fetched.
   */

  /*  function fetchMovie() {
     fetch("http://localhost:8081/movies")
       .then((res) => {
         if (!res.ok) {
           throw new Error("Failed to fetch movies");
         }
         return res.json();
       })
       .then((res) => {
         console.log(res);
         setState(res);
       })
       .catch((error) => {
         setError(error.message);
       });
   } */

  useEffect(() => {
    fetchMovies()
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        return res.json();
      })
      .then((res) => {
        getPosterPath(res);
      }).catch((error) => {
        setError(error.message);
      });
  }, []);


  function getPosterPath(res) {
    const apiKey = "82dee22856e0d0ac5f767ec6fb845efc";
    const moviePromises = res.map((movie) => {
      const { title } = movie;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;
      return fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch movie details");
          }
          return response.json();
        })
        .then((data) => {
          const { results } = data;
          if (results.length > 0) {
            const { poster_path } = results[0];
            movie.poster_path = poster_path;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    Promise.all(moviePromises)
      .then(() => {
        setState(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  /**
   * Filters the movies based on the filter criteria.
   * @param {Object} movie - The movie object to be filtered.
   * @returns {boolean} True if the movie matches the filter criteria, false otherwise.
   */
  const filteredMovies = state.filter((movie) => {
    const { title, director, year, genre, rating } = movie;
    return (
      title &&
      director &&
      year &&
      genre &&
      rating &&
      title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      director.toLowerCase().includes(directorFilter.toLowerCase()) &&
      year.toString().includes(yearFilter) &&
      genre.toLowerCase().includes(genreFilter.toLowerCase()) &&
      rating.toString().includes(ratingFilter)
    );
  });

  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline">
            Movies
          </div>
          {error && <div>Error: {error}</div>} {/* Display error message */}
          <div className="d-flex fs-6 align-items-center justify-content-evenly">
            <div className="col-md-2 col-sm-3 py-2">
              {showTitleFilter ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Title"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  onBlur={() => setShowTitleFilter(false)}
                />
              ) : (
                <button className="bg-dark text-white px-4 py-2 text-center button" onClick={() => setShowTitleFilter(true)}>
                  Filter by Title
                </button>
              )}
            </div>
            <div className="col-md-2 col-sm-3 py-2">
              {showDirectorFilter ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Director"
                  value={directorFilter}
                  onChange={(e) => setDirectorFilter(e.target.value)}
                  onBlur={() => setShowDirectorFilter(false)}
                />
              ) : (
                <button className="bg-dark text-white px-4 py-2 text-center button" onClick={() => setShowDirectorFilter(true)}>
                  Filter by Director
                </button>
              )}
            </div>
            <div className="col-md-2 col-sm-3 py-2">
              {showYearFilter ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  onBlur={() => setShowYearFilter(false)}
                />
              ) : (
                <button className="bg-dark text-white px-4 py-2 text-center button" onClick={() => setShowYearFilter(true)}>
                  Filter by Year
                </button>
              )}
            </div>
            <div className="col-md-2 col-sm-3 py-2">
              {showRatingFilter ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Rating"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  onBlur={() => setShowRatingFilter(false)}
                />
              ) : (
                <button className="bg-dark text-white px-4 py-2 text-center button" onClick={() => setShowRatingFilter(true)}>
                  Filter by Rating
                </button>
              )}
            </div>
            <div className="col-md-2 col-sm-3 py-2">
              {showGenreFilter ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Genre"
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                  onBlur={() => setShowGenreFilter(false)}
                />
              ) : (
                <button className="bg-dark text-white px-4 py-2 text-center button" onClick={() => setShowGenreFilter(true)}>
                  Filter by Genre
                </button>
              )}
            </div>
          </div>

          {filteredMovies.map((movie) => {
            const {
              id,
              title,
              director,
              year,
              genre,
              rating,
              poster_path,
            } = movie;

            return (
              <div className="col-md-3 col-sm-4 py-3">
                <div className="card bg-dark" onClick={()=>{
                  navigate(`/movies/${id}`);
                }}>
                  <img
                    src={
                      poster_path ? `${img_300}/${poster_path}` : unavailable
                    }
                    className="card-img-top pt-3 pb-0 px-3"
                    alt={title}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center fs-5">{title}</h5>
                    <h6 className="card-subtitle fs-6 text-muted">{director}</h6>
                    <p className="card-text"><small className="text-right text-muted">{year}</small></p>
                    <ul className="list-gruop list-group-flush list-unstyled">
                      <li className="text-muted" >Genre: {genre}</li>
                      <li className="text-muted">⭐ {rating}/10</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div >
      </div >
    </>
  );
};

export default Movies;
