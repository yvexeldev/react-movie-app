import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";

const Movie = ({movie}) => {
    const [loadingPoster, setLoadingPoster] = useState(true); // Initialize loading state
    const [posterSrc, setPosterSrc] = useState(null); // Initialize poster source

    useEffect(() => {
        if (movie.Poster !== "N/A") {
            // Only fetch the poster if it's not "N/A"
            const fetchPoster = async () => {
                try {
                    const response = await fetch(movie.Poster);
                    if (response.ok) {
                        setPosterSrc(movie.Poster);
                    }
                } catch (error) {
                    console.error("Error fetching poster:", error);
                } finally {
                    setLoadingPoster(false);
                }
            };
            fetchPoster();
        } else {
            setLoadingPoster(false);
        }
    }, [movie.Poster]);

    return (
        <div className={"movie"}>
            <div>
                <p>{movie.Year}</p>
            </div>

            <div>
                {loadingPoster ? (
                    <h3 className={".loading"}>Loading...</h3>
                ) : (
                    <img
                        src={posterSrc || "https://via.placeholder.com/500"}
                        alt="moviePoster"
                    />
                )}
            </div>

            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
};

Movie.propTypes = {
    movie: PropTypes.object.isRequired,
};

export {Movie};
