import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { TWatchedMovie } from "../types";
import Loader from "./Loader";
import useGetMovieDetails from "../hooks/useGetMovieDetails";

// Lazy load
const StarRating = lazy(() => import("./StarRating"));

type TMovieDetailsProps = {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: TWatchedMovie) => void;
  watched: TWatchedMovie[];
};

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: TMovieDetailsProps) {
  const { movie } = useGetMovieDetails(selectedId);
  const [userRating, setUserRating] = useState<number>(0);
  const watchedUser = useMemo(
    () => watched.find((movie) => movie.imdbID === selectedId),
    [watched, selectedId]
  );

  const handleAdd = () => {
    const newWatchedMovie: TWatchedMovie = {
      imdbID: selectedId,
      title: movie?.title,
      year: movie?.year,
      poster: movie?.poster,
      imdbRating: Number(movie?.imdbRating),
      runtime: Number(movie?.runtime.split(" ")[0]),
      userRating: userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const keyDownEvent = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", keyDownEvent);

    return () => {
      document.removeEventListener("keydown", keyDownEvent);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    if (!movie?.title) return;
    document.title = `Movie | ${movie?.title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [movie?.title]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="details">
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={movie?.poster} alt={`Poster of ${movie} movie`} />
          <div className="details-overview">
            <h2>{movie?.title}</h2>
            <p>
              {movie?.released} &bull; {movie?.runtime}
            </p>
            <p>{movie?.genre}</p>
            <p>
              <span>⭐️</span>
              {movie?.imdbRating} IMDb rating
            </p>
          </div>
        </header>
        <section>
          <div className="rating">
            {!watchedUser ? (
              <>
                <Suspense fallback={<Loader />}>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />
                </Suspense>
                {+userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            ) : (
              <p>
                You rated with movie {watchedUser?.userRating} <span>⭐️</span>
              </p>
            )}
          </div>
          <p>
            <em>{movie?.plot}</em>
          </p>
          <p>Starring {movie?.actors}</p>
          <p>Directed by {movie?.director}</p>
        </section>
      </div>
    </Suspense>
  );
}
