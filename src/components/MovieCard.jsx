import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="bg-yellow-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/400x600?text=No+Image"
        }
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {movie.Title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{movie.Year}</p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition">
          {movie.Type.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
