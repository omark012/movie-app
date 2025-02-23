import React, { useState } from "react";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie, openModal }) => {
  const { title, vote_average, poster_path, release_date, original_language } =
    movie;

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => openModal(movie)}
        className="movie-card hover:scale-105 cursor-pointer hover:shadow-md hover:shadow-gray-300 transition duration-200"
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt=""
        />
        <div className="mt-4">
          <h2 className="">{title}</h2>
          <div className="content">
            <div className="rating">
              <img src="/star.svg" alt="star" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N?A"}
            </p>
            <span>•</span>
          </div>
        </div>
      </div>
      {/* Popup Modal Functionality below by sending individual movie
      {isModalOpen && (
        <MovieDetails movie={movie} setIsModalOpen={setIsModalOpen} />
      )} */}
    </>
  );
};

export default MovieCard;
