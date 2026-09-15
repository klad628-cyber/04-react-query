import type { Movie } from "../../types/movie";

import styles from "./MovieGrid.module.css";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const getPosterUrl = (posterPath: string) =>
  posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://placehold.co/500x750/111827/ffffff?text=No+Poster";

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <button
            type="button"
            className={styles.card}
            onClick={() => onSelect(movie)}
          >
            <img
              className={styles.image}
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
