import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/OmbdAPi";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman"); // default search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const moviesPerPage = 12; // number of movies per UI page

  useEffect(() => {
    loadMovies();
  }, [query, currentPage]);

  const loadMovies = async () => {
    setLoading(true);
    setError("");

    try {
      // OMDB returns 10 per API page, so calculate which API pages to fetch
      const firstOmdbPage =
        Math.floor(((currentPage - 1) * moviesPerPage) / 10) + 1;
      const secondOmdbPage = firstOmdbPage + 1;

      const data1 = await fetchMovies(query, firstOmdbPage);
      const data2 = await fetchMovies(query, secondOmdbPage);

      // combine results and slice exactly 12 movies
      const combined = [...(data1.Search || []), ...(data2.Search || [])];
      const startIndex = ((currentPage - 1) * moviesPerPage) % 10;
      const tempSlice = combined.slice(startIndex, startIndex + moviesPerPage);
      const currentMovies =
        tempSlice.length > moviesPerPage
          ? tempSlice.slice(0, moviesPerPage)
          : tempSlice;
        
      

      setMovies(currentMovies);
      setTotalResults(parseInt(data1.totalResults, 10) || 0);

      if (currentMovies.length === 0) setError("No movies found.");
    } catch {
      setMovies([]);
      setTotalResults(0);
      setError("Failed to fetch movies.");
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // reset to first page
    loadMovies();
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10 drop-shadow-lg">
          🎬 Movie Search App
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none text-gray-100 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-r-lg shadow-md"
          >
            Search
          </button>
        </form>

        {/* Error */}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Loading */}
        {loading && <p className="text-center">Loading...</p>}

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          moviesPerPage={moviesPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Home;
