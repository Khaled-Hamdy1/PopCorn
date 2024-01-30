export type TMovieDetailsAPI = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type TMovieAPI = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
export type TMovie = {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
};

export type TWatchedMovie = {
  imdbID: string;
  title?: string;
  year?: string;
  poster?: string;
  imdbRating: number;
  runtime: number;
  userRating: number;
};
