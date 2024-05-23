import React, { useEffect } from "react";

// Define the Book interface
interface Book {
  ratings_average: number;
  author_name: string[];
  title: string;
  first_publish_year: number;
  subject: string[];
  author_birth_date: string[];
  author_top_work: string[];
}

// Define the BookTableProps interface
interface BookTableProps {
  books: Book[];
  loading: boolean;
  onSort: (column: string) => void;
  sortColumn: string;
  sortOrder: string;
  activeDownloadCSV: boolean;
}
// Define the BookTable component
const BookTable: React.FC<BookTableProps> = ({
  books,
  loading,
  onSort,
  sortColumn,
  sortOrder,
  activeDownloadCSV,
}) => {

  // Download CSV file
  const downloadCSV = () => {
    const headers = [
      "Rating",
      "Author",
      "Title",
      "First Publish Year",
      "Subject",
      "Author Birth Date",
      "Author Top Work",
    ];
    // Map the books array to rows
    const rows = books.map((book) => [
      book.ratings_average || "N/A",
      book.author_name?.join(", ") || "N/A",
      book.title,
      book.first_publish_year || "N/A",
      book.subject?.join(", ") || "N/A",
      book.author_birth_date?.join(", ") || "N/A",
      book.author_top_work?.join(", ") || "N/A",
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "books.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
  };

  // Download CSV when activeDownloadCSV is true
  
  useEffect(() => {
    if (activeDownloadCSV) {
      downloadCSV();
    }
  }, [activeDownloadCSV]);
  return (
    <>
    <table>
      <thead>
        <tr>
          {[
            "ratings_average",
            "author_name",
            "title",
            "first_publish_year",
            "subject",
            "author_birth_date",
            "author_top_work",
          ].map((column) => (
            <th key={column} onClick={() => onSort(column)}>
              {column.replace("_", " ")}{" "}
              {sortColumn === column && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={7}>Loading...</td>
          </tr>
        ) : (
          books.map((book, index) => (
            <tr key={index}>
              <td>{book.ratings_average || "N/A"}</td>
              <td>{book.author_name?.join(", ") || "N/A"}</td>
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
              <td>{book.subject?.join(", ") || "N/A"}</td>
              <td>{book.author_birth_date?.join(", ") || "N/A"}</td>
              <td>{book.author_top_work?.join(", ") || "N/A"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    
     </>
  );
};

export default BookTable;
