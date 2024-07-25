"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from '../../components/Layout';
import styles from '../../styles/series.module.scss';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      },
    })
    .then(response => {
      setSeries(response.data.results);
    })
    .catch(error => {
      console.error('Error fetching the series:', error);
    });
  }, []);

  const fetchSerieDetails = async (serieId) => {
    try {
      const [serieResponse, creditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/tv/${serieId}`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/tv/${serieId}/credits`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          },
        }),
      ]);

      setSelectedSerie({ ...serieResponse.data, credits: creditsResponse.data });
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Error fetching series details:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.seriesContainer}>
        <h1>Popular Series</h1>
        <ul className={styles.seriesList}>
          {series.map(serie => (
            <li key={serie.id} className={styles.serieItem} onClick={() => fetchSerieDetails(serie.id)}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                alt={`${serie.name}`} 
                className={styles.seriePoster}
              />
              <div className={styles.serieDetails}>
                <h2>{serie.name}</h2>
                <p><strong>Release Date:</strong> {serie.first_air_date} </p>
                <p>{serie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isPopupOpen && selectedSerie && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setIsPopupOpen(false)}>X</button>
            <h2>{selectedSerie.name}</h2>
            <img 
              src={`https://image.tmdb.org/t/p/w500${selectedSerie.poster_path}`} 
              alt={selectedSerie.name} 
              className={styles.popupPoster}
            />
            <p>{selectedSerie.overview}</p>
            <p><strong>Rating:</strong> {selectedSerie.vote_average}</p>
            <p><strong>First Air Date:</strong> {selectedSerie.first_air_date}</p>
            <p><strong>Actors:</strong> {selectedSerie.credits.cast.map(actor => actor.name).join(', ')}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Series;
