import React, {useEffect, useState} from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import {Movie} from "./components/Movie.jsx";

const API_URL = "http://www.omdbapi.com/?apikey=";

export const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    const searchMovies = async (title) => {
        setLoading(true); // Set loading to true when fetching data
        const data = await (await fetch(`${API_URL}&s=${title}`)).json();
        setMovies(data.Search);
        setLoading(false); // Set loading back to false after fetching data
    };

    useEffect(() => {
        // You can add any initial setup here if needed
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder={"Search for movies..."}
                    onInput={(e) => {
                        searchMovies(e.target.value);
                    }}
                />
                <img src={SearchIcon} alt={"search"}/>
            </div>

            {/* Conditional rendering based on loading state and movies data */}
            {loading ? (
                <h3 className="loading">Loading...</h3>
            ) : movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <Movie key={movie.imdbID} movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movie found</h2>
                </div>
            )}


        </div>
    );
};
