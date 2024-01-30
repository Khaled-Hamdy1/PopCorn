import {  TMovie } from "../types";

type TMovieProps = {
  movie: TMovie;
  onSelectMovie: (id?: string) => void;
};

export default function Movie({ movie, onSelectMovie }: TMovieProps) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
      </div>
    </li>
  );
}
