import { useState } from "react";
import "../index.css";
import { TWatchedMovie } from "../types";
import Search from "./Search";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import useGetMovies from "../hooks/useGetMovies";
import Logo from "./Logo";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [watched, setWatched] = useState<TWatchedMovie[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useGetMovies(query);

  function handleSelectMovie(id?: string) {
    if (!id) return;
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: TWatchedMovie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id?: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </nav>

      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}