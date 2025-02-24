import React, { useEffect } from "react";

const MovieDetails = ({ movie, closeModal }) => {
  const {
    title,
    release_date,
    vote_average,
    original_language,
    overview,
    poster_path,
    trailerLink,
    genre_ids,
  } = movie;

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll when modal is closed
    };
  }, []);

  const genreName = genre_ids.map((id) => {
    const genre = genres.find((genre) => id === genre.id);
    return genre.name; // ans is returned to new array genreName which will hold only genre name
  });

  return (
    <div
      onClick={() => closeModal()}
      className="fixed mx-3   inset-0 bg-black/55 flex justify-center items-center z-50"
    >
      <div className=" w-6xl h-auto sm:h-[60vh] bg-slate-800 text-slate-100 shadow-lg rounded-lg overflow-y-auto flex flex-col sm:flex-row justify-between items-center">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt="Card Image"
          className="w-44 sm:w-auto sm:h-full object-cover rounded-md"
        />
        <div className="movie-details flex flex-col space-y-4 p-4 w-full">
          <h2 className="text-2xl md:text-4xl font-semibold">{title}</h2>
          <div className="genre text-gray-400 flex gap-1 capitalize -mt-3">
            {genreName.map((genre, index) => (
              <p key={index}>
                {genre}
                {index < genreName.length - 1 && " |"}
              </p>
            ))}
          </div>
          <div className="detail flex items-center flex-wrap gap-5">
            <p className="year flex gap-1 bg-slate-700 p-1 rounded">
              <img className="w-4" src="/calender.svg" alt="calender" />
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
            <div className="rate flex bg-slate-700 p-1 rounded space-x-1">
              <img src="/star.svg" alt="star" />
              <p className=" ">
                {vote_average ? vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
            <div className="lang bg-slate-700 p-1 rounded flex gap-1 capitalize">
              <img className="w-4" src="/globe.svg" alt="globe" />
              <p className=" ">{original_language || "N/A"}</p>
            </div>
          </div>
          <p className=" mt-2 h-auto text-base text-gray-200 text-justify">
            {overview || "Description Not Available"}
          </p>

          <a
            className="px-4 py-2 w-full bg-red-600 text-white rounded-lg transition duration-200 cursor-pointer text-xl text-center hover:bg-red-700 flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href={trailerLink}
          >
            <img className="w-4" src="/play.svg" alt="play" />
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
