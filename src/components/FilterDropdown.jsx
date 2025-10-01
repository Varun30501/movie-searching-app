import React from "react";

const FilterDropdown = ({ selectedType, setSelectedType }) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="">All</option>
      <option value="movie">Movie</option>
      <option value="series">Series</option>
      <option value="episode">Episode</option>
    </select>
  );
};

export default FilterDropdown;
