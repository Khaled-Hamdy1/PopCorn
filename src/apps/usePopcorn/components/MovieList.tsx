import { TMovie } from "../types";
import Movie from "./Movie";

type TMoviesList = {
  movies: TMovie[];
  onSelectMovie: (id: string) => void;
};

export default function MovieList({ movies, onSelectMovie }: TMoviesList) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
