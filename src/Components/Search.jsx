import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div className="overflow-hidden">
        <img src="/search.svg" alt="" />

        <input
          type="text"
          placeholder="Search through thousands of movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          name="search"
        />
      </div>
    </div>
  );
};

export default Search;
