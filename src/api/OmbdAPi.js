// src/api/omdbApi.js
/*import axios from "axios";*/

// Replace with your actual OMDB API key
const API_KEY = "4795e3f1";

export const fetchMovies = async (query, page = 1, type = "") => {
  try {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`;
    if (type) {
      url += `&type=${type}`;
    }

    const res1 = await fetch(url);
    const data1 = await res1.json();

    if (data1.Response === "False") {
      return { Search: [], totalResults: 0 };
    }

    let movies = data1.Search || [];
    let totalResults = parseInt(data1.totalResults || "0", 10);

    // If fewer than 12, fetch next page and merge
    if (movies.length < 12 && movies.length < totalResults) {
      const res2 = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page + 1}${type ? `&type=${type}` : ""}`
      );
      const data2 = await res2.json();
      if (data2.Search) {
        movies = [...movies, ...data2.Search].slice(0, 12);
      }
    }

    return { Search: movies, totalResults };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Search: [], totalResults: 0 };
  }
};

// Fetch detailed movie info
export const fetchMovieDetails = async (id) => {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
