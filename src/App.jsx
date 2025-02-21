import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "react-use";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

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

      setMovieList(data.results);
      console.log(movieList);
    } catch (error) {
      console.error(`Error while fetching movies: ${error}`);
      setErrorMessage("Error while fetching movies. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  console.log(movieList);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className=" -mt-10">
          <img src="./hero.png" alt="banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="all-movies mt-20">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
