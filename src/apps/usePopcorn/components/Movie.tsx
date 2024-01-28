import { TMovie } from "../types";

type TMovieProps = {
  movie: TMovie;
  onSelectMovie: (id: string) => void;
};

export default function Movie({ movie, onSelectMovie }: TMovieProps) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
