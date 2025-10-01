import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-4 mb-6 w-full"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition transform shadow-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
