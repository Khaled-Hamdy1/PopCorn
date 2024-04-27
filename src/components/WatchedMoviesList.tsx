import { TWatchedMovie } from "../types";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
}: {
  watched: TWatchedMovie[];
  onDeleteWatched: (id?: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
