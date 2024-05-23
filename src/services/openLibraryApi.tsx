const API_URL = 'https://openlibrary.org/search.json';

export const fetchBooks = async (
  query: string,
  page: number,
  limit: number,
  sortColumn: string,
  sortOrder: string
) => {
  const response = await fetch(
    `${API_URL}?q=${query}&page=${page}&limit=${limit}&sort=${sortColumn}&order=${sortOrder}`
  );
  const data = await response.json();
  return data;
};
