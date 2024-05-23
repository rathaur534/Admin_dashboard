import React, { useEffect, useState } from "react";
// Define the SearchBarProps interface
interface SearchBarProps {
  onSearch: (query: string) => void;
}
// Define the SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("aa");
// Define the handleSearch function
  const handleSearch = () => {
    onSearch(query);
  };
// Define the useEffect hook
  useEffect(() => {
    onSearch(query);
  }
  , []);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by author"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
