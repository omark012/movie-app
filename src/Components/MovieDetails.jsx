import React, { useEffect } from "react";

const MovieDetails = ({ movie, closeModal }) => {
  console.log(movie, "details");

  const {
    title,
    release_date,
    vote_average,
    original_language,
    media_type,
    overview,
    poster_path,
    trailerLink,
  } = movie;

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll when modal is closed
    };
  }, []);

  return (
    <div
      onClick={() => closeModal()}
      className="fixed inset-0 bg-black/55 flex justify-center items-center z-50"
    >
      <div className="p-2 my-52 w-6xl h-auto sm:h-[60vh] bg-slate-800 text-slate-100 shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row justify-between items-center">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt="Card Image"
          className="w-44 sm:w-auto sm:h-full object-cover rounded-md"
        />
        <div className="movie-details flex flex-col space-y-4 p-4">
          <h2 className="text-2xl md:text-4xl font-semibold">{title}</h2>
          <div className="detail flex items-center space-x-10">
            <p className="year bg-slate-700 p-1 rounded">
              {release_date ? release_date.split("-")[0] : "N?A"}
            </p>
            <div className="rate flex bg-slate-700 p-1 rounded space-x-1">
              <img src="/star.svg" alt="star" />
              <p className=" ">
                {vote_average ? vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
            <div className="lang">
              <p className=" bg-slate-700 p-1 rounded">{original_language}</p>
            </div>
          </div>
          <p className=" mt-2 h-auto text-base  ">{overview}</p>

          <a
            className="px-4 py-2 w-full bg-red-500 text-white rounded-lg transition duration-200 cursor-pointer text-xl text-center hover:bg-red-600"
            target="_blank"
            href={trailerLink}
          >
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
