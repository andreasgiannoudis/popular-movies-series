"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Layout from '../../components/Layout';
import styles from '../../styles/series.module.scss';

const Series = () => {
    const [series, setSeries] = useState([]);
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
          console.error('Error fetching the movies:', error);
        });
      }, []);

      return (
        <Layout>
            <div className={styles.seriesContainer}>
            <h1>Popular Series</h1>
            <ul className={styles.seriesList}>
            {series.map(serie => (
            <li key={serie.id} className={styles.serieItem}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                alt={`${serie.title}`} 
                className={styles.seriePoster}
              />
              <div className={styles.serieDetails}>
                <h2>{serie.title}</h2>
                <p><strong>Release Date:</strong> {serie.release_date} </p>
                <p>{serie.overview}</p>
              </div>
            </li>
          ))}

            </ul>

            </div>


        </Layout>
      );



};

export default Series;