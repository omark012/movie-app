import React, { useState } from "react";
import AllMovies from "./AllMovies";
import Trending from "./Trending";
import MovieDetails from "./MovieDetails";

const MovieContainer = ({
  trendingMovies,
  movieList,
  isLoading,
  errorMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };
  return (
    <>
      <Trending
        trendingMovies={trendingMovies}
        openModal={openModal}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <AllMovies
        movieList={movieList}
        isLoading={isLoading}
        errorMessage={errorMessage}
        openModal={openModal}
      />
      {/* Movie Details Modal */}
      {isModalOpen && (
        <MovieDetails movie={selectedMovie} closeModal={closeModal} />
      )}
    </>
  );
};

export default MovieContainer;
