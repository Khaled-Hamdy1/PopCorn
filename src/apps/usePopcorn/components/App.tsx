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
  const [watched, setWatched] = useState<TWatchedMovie[]>(() => {
    const watched = localStorage.getItem("watched");
    return watched ? JSON.parse(watched) : [];
  });
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
    const newWatchedMovie: TWatchedMovie[] = [...watched, movie];
    setWatched(newWatchedMovie);
    localStorage.setItem("watched", JSON.stringify(newWatchedMovie));
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Movie added to watched list", {
          body: `${movie?.title} was added to your watched list`,
        });
      } else {
        console.log("No permission for notifications");
      }
    });
  }

  function handleDeleteWatched(id?: string) {
    const confirm = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirm || !id) return;
    const newWatchedMovie: TWatchedMovie[] = watched.filter(
      (movie) => movie.imdbID !== id
    );
    setWatched(newWatchedMovie);
    localStorage.setItem("watched", JSON.stringify(newWatchedMovie));
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

          {error && (
            <ErrorMessage message={query ? error : "search on Movie"} />
          )}
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
