import { useEffect, useState } from "react";
import { TMovie, TMovieAPI } from "../types";

export default function useGetMovies(query: string) {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async function () {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=97b77be1&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        const Result: TMovie[] = data.Search.map((item: TMovieAPI) => {
          return {
            title: item.Title,
            year: item.Year,
            imdbID: item.imdbID,
            poster: item.Poster,
          };
        });

        setMovies(Result);
        setError("");
      } catch (error) {
        const err = error as Error;
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
