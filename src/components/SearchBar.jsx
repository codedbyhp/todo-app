import React from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="searchbar">
      <input
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
