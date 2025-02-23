import React from "react";

const Trending = ({ trendingMovies, openModal }) => {
  return (
    <section className="trending">
      <h2 className="my-5">Trending Movies</h2>
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
    </section>
  );
};

export default Trending;
