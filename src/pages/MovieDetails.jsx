import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../api/OmbdAPi";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === "True") {
          setMovie(data);
          setError("");
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to fetch movie details.");
      }
    };
    loadMovie();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!movie) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen w-200 bg-yellow-200 p-6 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl">
        {/* Poster */}
        <div className="md:w-1/2 flex justify-center items-center p-4">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Image"
            }
            alt={movie.Title}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {movie.Title}
          </h1>
          <p className="text-gray-600 mb-2">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}
          </p>

          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
