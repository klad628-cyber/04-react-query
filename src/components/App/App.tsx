import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
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
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isPending, isFetching, isSuccess, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query),
    placeholderData: keepPreviousData,
  });
  const movies = data?.results ?? [];

  useEffect(() => {
    if (isError) {
      toast.error("There was an error, please try again...");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && query && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, movies.length, query]);

  const handleSearch = (nextQuery: string) => {
    setSelectedMovie(null);
    setPage(1);
    setQuery(nextQuery);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    setSelectedMovie(null);
  };

  return (
    <div className={styles.page}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {isPending && !data ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          <>
            {movies.length > 0 ? (
              <MovieGrid movies={movies} onSelect={setSelectedMovie} />
            ) : null}

            {isSuccess && data.total_pages > 1 ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={data.total_pages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                pageClassName={styles.pageItem}
                pageLinkClassName={styles.pageLink}
                previousClassName={styles.pageItem}
                previousLinkClassName={styles.pageLink}
                nextClassName={styles.pageItem}
                nextLinkClassName={styles.pageLink}
                breakClassName={styles.pageItem}
                breakLinkClassName={styles.pageLink}
                activeClassName={styles.activePage}
                disabledClassName={styles.disabledPage}
              />
            ) : null}

            {isFetching ? <Loader /> : null}
          </>
        )}
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
