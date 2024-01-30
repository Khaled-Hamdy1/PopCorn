import { useEffect, useState } from "react";
import { TWatchedMovie } from "../types";
import Loader from "./Loader";
import StarRating from "./StarRating";
import useGetMovieDetails from "../hooks/useGetMovieDetails";

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
  const {movie,isLoading} = useGetMovieDetails(selectedId);
  const [userRating, setUserRating] = useState<number>(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {

    const newWatchedMovie: TWatchedMovie = {
      imdbID: selectedId,
      title: movie?.title,
      year: movie?.year,
      poster: movie?.poster,
      imdbRating: Number(movie?.imdbRating),
      runtime: Number(movie?.runtime.split(" ")[0]),
      userRating : userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    const callback = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  useEffect(
    function () {
      if (!movie?.title) return;
      document.title = `Movie | ${movie?.title}`;

      return function () {
        document.title = "usePopcorn";
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [movie?.title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              {!isWatched ? (
                <>
                  <StarRating
                    onSetRating={setUserRating}
                    maxRating={10}
                    size={24}
                  />
                  {Number(userRating) > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                  {/* You rated with movie 5 <span>⭐️</span> */}
                </p>
              )}
            </div>
            <p>
              <em>{movie?.plot}</em>
            </p>
            <p>Starring {movie?.actors}</p>
            <p>Directed by {movie?.director}</p>
          </section>
        </>
      )}
    </div>
  );
}
