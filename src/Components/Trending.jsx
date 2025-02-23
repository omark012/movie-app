import React from "react";
import Spinner from "./Spinner";

const Trending = ({ trendingMovies, openModal, isLoading, errorMessage }) => {
  return (
    <section className="trending">
      <h2 className="my-5">Trending Movies</h2>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {trendingMovies.map((movie, index) => (
            <li
              key={movie.id}
              className="group transition duration-200 cursor-pointer hover:scale-105"
              onClick={() => openModal(movie)}
            >
              <p className="transition-all duration-200 group-hover:text-white">
                {index + 1}
              </p>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "/no-movie.png"
                }
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Trending;
