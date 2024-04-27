type TSearch = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ query, setQuery }: TSearch) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
