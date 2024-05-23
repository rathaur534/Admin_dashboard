import React, { useState, useEffect } from "react";
import BookTable from "../components/BookTable";
import SearchBar from "../components/SearchBar";
import { fetchBooks } from "../services/openLibraryApi";

const Dashboard: React.FC = () => {
  // Define the state variables
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [query, setQuery] = useState<string>("");
  const [activeDownloadCSV, setActiveDownloadCSV] = useState<boolean>(false);
  const [atomic, setAtomic] = useState<boolean>(false);
// Define the useEffect hook
  useEffect(() => {
    fetchBooksData();
  }, [page, perPage, sortColumn, sortOrder, query]);
// Define the fetchBooksData function
  const fetchBooksData = async () => {
    setLoading(true);
    const data = await fetchBooks(query, page, perPage, sortColumn, sortOrder);
    setBooks(data.docs);
    setLoading(false);
  };
// Define the handleSort function
  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };
// Define the handleSearch function
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };
// Define the handleDownloadCSV function
  if (!atomic) {
    setAtomic(true);
    handleSearch("aa");
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <SearchBar onSearch={handleSearch} />

      <BookTable
        books={books}
        loading={loading}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        activeDownloadCSV={activeDownloadCSV}
      />

      <div className="pagination">
        <label>
          Records per page:
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        {/* download CSV  */}

        <button
          onClick={() => setActiveDownloadCSV(true)}
          disabled={activeDownloadCSV}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
