import React from "react";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const AllMovies = ({ movieList, isLoading, errorMessage, openModal }) => {
  return (
    <section className="all-movies mt-10">
      <h2>All Movies</h2>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} openModal={openModal} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default AllMovies;
