import { useEffect, useState } from "react";
import {  TMovieDetailsAPI } from "../types";

export default function useGetMovieDetails(selectedId: string) {
  const [movie, setMovie] = useState<TMovieDetailsAPI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=97b77be1&i=${selectedId}`
        );
        if (!res.ok) {
          setError(new Error("Failed to fetch movie details"));
          throw new Error("Failed to fetch movie details");
        }
        const data:TMovieDetailsAPI = (await res.json())
        
        setMovie(data);
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
