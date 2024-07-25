"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import styles from '../../styles/movies.module.scss';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const fetchMovieDetails = async (movieId) => {
    try {
      const [movieResponse, creditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }),
      ]);

      setSelectedMovie({ ...movieResponse.data, credits: creditsResponse.data });
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.moviesContainer}>
        <h1>Popular Movies</h1>
        <ul className={styles.moviesList}>
          {movies.map(movie => (
            <li key={movie.id} className={styles.movieItem} onClick={() => fetchMovieDetails(movie.id)}>
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

      {isPopupOpen && selectedMovie && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setIsPopupOpen(false)}>X</button>
            <h2>{selectedMovie.title}</h2>
            <img 
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} 
              alt={selectedMovie.title} 
              className={styles.popupPoster}
            />
            <p>{selectedMovie.overview}</p>
            <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
            <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
            <p><strong>Actors:</strong> {selectedMovie.credits.cast.map(actor => actor.name).join(', ')}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Movies;
