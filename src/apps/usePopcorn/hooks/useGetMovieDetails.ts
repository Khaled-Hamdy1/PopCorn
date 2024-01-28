import { useEffect, useState } from "react";
import { TMovieDetails, TMovieDetailsAPI } from "../types";

export default function useGetMovieDetails(selectedId: string) {
  const [movie, setMovie] = useState<TMovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=97b77be1&i=${selectedId}`
        );
        if (!res.ok) {
          setError(new Error("Failed to fetch movie details"));
          throw new Error("Failed to fetch movie details");
        }
        const data = (await res.json()) as TMovieDetailsAPI;
        console.log(data);
        
        const {
          Title: title,
          Year: year,
          Poster: poster,
          Runtime: runtime,
          imdbRating,
          Plot: plot,
          Released: released,
          Actors: actors,
          Director: director,
          Genre: genre,
        } = data;
        
        setMovie({
          title,
          year,
          poster,
          runtime,
          imdbRating,
          plot,
          released,
          actors,
          director,
          genre,
        } as TMovieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(new Error("Failed to fetch movie details"));
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) {
      getMovieDetails();
    } else {
      setMovie(null);
      setError(new Error("No movie selected"));
    }
  }, [selectedId]);

  return { movie, isLoading, error};
}
