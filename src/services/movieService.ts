import axios from "axios";

import type { Movie } from "../types/movie";

interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
}

const tmdbToken =
  import.meta.env.VITE_TMDB_TOKEN ??
  import.meta.env.VITE_THERMOVIEW_API_TOKEN ??
  "";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    ...(tmdbToken
      ? {
          Authorization: `Bearer ${tmdbToken}`,
        }
      : {}),
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MovieSearchResponse> => {
  const response = await api.get<MovieSearchResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });

  return response.data;
};
