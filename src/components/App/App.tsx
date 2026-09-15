import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movies = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: Boolean(query),
  });

  useEffect(() => {
    if (isError) {
      toast.error("There was an error, please try again...");
    }
  }, [isError]);

  useEffect(() => {
    if (!isPending && !isError && query && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isError, isPending, movies.length, query]);

  const handleSearch = (nextQuery: string) => {
    setSelectedMovie(null);
    setQuery(nextQuery);
  };

  return (
    <div className={styles.page}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {isPending ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage />
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        ) : null}
      </main>

      {selectedMovie ? (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      ) : null}

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default App;
