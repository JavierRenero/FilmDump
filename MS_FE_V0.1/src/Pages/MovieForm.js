import { useState, useEffect } from "react";
import { createMovie, fetchMovie, updateMovie, deleteMovie } from "../Components/api";
import { useParams, useNavigate } from "react-router-dom";

function MovieForm() {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (!params.id) {
                const res = await createMovie({ title, director, year, genre, rating });
                console.log(res);
            } else {
                const res = await updateMovie(params.id, { title, director, year, genre, rating });
                console.log(res);
            }
            navigate("/");
        } catch (error) {
            console.error(error);
            if (error.response?.data) {
                alert(error.response.data.detail);
            }
        }

        e.target.reset();
    };

    useEffect(() => {
        if (params.id) {
            fetchMovie(params.id).then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return res.json();
            })
                .then((res) => {
                    console.log(res);
                    setTitle(res.title);
                    setDirector(res.director);
                    setYear(res.year);
                    setGenre(res.genre);
                    setRating(res.rating);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <div id="cardFrom">
            <div>
                <form id="form" className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                    <h5 className="text-3xl font-bold my-4">Create Movie</h5>
                    <input
                        type="text"
                        placeholder="title"
                        className="block p-2 py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        autoFocus
                    />
                    <input
                        type="text"
                        placeholder="director"
                        className="block p-2 py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setDirector(e.target.value)}
                        value={director}
                    ></input>
                    <input
                        type="number"
                        placeholder="year"
                        className="block p-2 py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setYear(e.target.value)}
                        value={year}
                    ></input>
                    <input
                        type="text"
                        placeholder="genre"
                        className="block p-2 py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setGenre(e.target.value)}
                        value={genre}
                    ></input>
                    <input
                        type="number"
                        placeholder="rating"
                        className="block p-2 py-2 px-3 mb-4 w-full text-black"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                    ></input>
                    <button className="bg-dark text-white px-4 py-2 text-center button">
                        {params.id ? "Update" : "Create"}
                    </button>
                    <br></br>
                    {params.id && (
                    <button
                    id="deleteButton"
                        className="bg-dark text-white px-4 py-2 text-center button"
                        onClick={async () => {
                            try {
                                const res = await deleteMovie(params.id);
                                console.log(res);
                                navigate("/");
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        Delete
                    </button>
                )}
                </form>

                
            </div>
        </div>
    );
}

export default MovieForm;
