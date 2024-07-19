"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import styles from '../../styles/movies.module.scss';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      },
    })
    .then(response => {
      setMovies(response.data.results);
    })
    .catch(error => {
      console.error('Error fetching the movies:', error);
    });
  }, []);

  return (
    <Layout>
      <div className={styles.moviesContainer}>
        <h1>Popular Movies</h1>
        <ul className={styles.moviesList}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movieItem}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={`${movie.title}`} 
                className={styles.moviePoster}
              />
              <div className={styles.movieDetails}>
                <h2>{movie.title}</h2>
                <p><strong>Release Date:</strong> {movie.release_date} </p>
                <p>{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Movies;
