import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import { useDebounce } from "react-use";
import Header from "./Components/Header";
import Trending from "./Components/Trending";
import AllMovies from "./Components/AllMovies";
import MovieDetails from "./Components/MovieDetails";
import MovieContainer from "./Components/MovieContainer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  //API properties

  const API_BASE_URL = `https://api.themoviedb.org/3`;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  // debounce the search term to prevent making many API requests while typing.
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1500, [searchTerm]);

  // Fetching All Movies and Searched using TMDB API
  const fetchMovies = async (query) => {
    setIsLoading(true);

    try {
      const url = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)} `
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();

      if (data.Response == false) {
        setErrorMessage("Failed to fetch movies. Please try again later");
        return;
      }

      // Fetch trailers for each movie
      const moviesWithTrailers = await Promise.all(
        data.results.map(async (movie) => {
          const trailerUrl = `${API_BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;
          const trailerResponse = await fetch(trailerUrl, API_OPTIONS);
          const trailerData = await trailerResponse.json();

          const trailer = trailerData.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          return {
            ...movie,
            trailerLink: trailer
              ? `https://www.youtube.com/watch?v=${trailer.key}`
              : null,
          };
        })
      );

      setMovieList(moviesWithTrailers);
    } catch (error) {
      console.error(`Error while fetching movies: ${error}`);
      setErrorMessage("Error while fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Trending Movies from TMDB API

  const fetchTrendingMovies = async () => {
    try {
      const url = `${API_BASE_URL}/trending/movie/day`;
      const response = await fetch(url, API_OPTIONS);
      const data = await response.json();
      console.log(data.results, "trend");
      setTrendingMovies(data.results);
    } catch (error) {
      console.error(`Error while fetching Trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <Header />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MovieContainer
          trendingMovies={trendingMovies}
          movieList={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </main>
  );
};

export default App;

{
  /* <Trending trendingMovies={trendingMovies}  />
<AllMovies
  movieList={movieList}
  isLoading={isLoading}
  errorMessage={errorMessage}
/> */
}
