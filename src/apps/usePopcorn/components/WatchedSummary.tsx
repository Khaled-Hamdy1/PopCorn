import { TWatchedMovie } from "../types";

const average = (arr: number[]) =>
  arr.reduce((acc, cur, _i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }: { watched: TWatchedMovie[] }) {
  const avgImdbRating = average(watched.map((movie) => +(movie.runtime || 0)));
  const avgUserRating = average(watched.map((movie) => +(movie.runtime || 0)));
  const avgRuntime = average(watched.map((movie) => +(movie.runtime || 0)));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
