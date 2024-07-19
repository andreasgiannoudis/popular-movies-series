"use client";
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import styles from '../styles/home.module.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query: query,
        },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching the search results:', error);
    }
  };

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <h1>Welcome to the Movie and Series App</h1>
        <div className={styles.description}>
          <p>This application allows you to browse popular movies and TV series.</p>
        </div>
        <p>Navigate to the Movies or Series page using the menu above to see the latest popular content.</p>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie or series..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {results.length > 0 && (
          <div className={styles.resultsContainer}>
            <h2>Search Results</h2>
            <ul>
              {results.map(result => (
                <li key={result.id}>
                  <h3>{result.title || result.name}</h3>
                  <p>{result.overview}</p>
                  {result.poster_path || result.profile_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`} 
                      alt={result.title || result.name} 
                    />
                  ) : (
                    <div className={styles.noImage}>No Image Available</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
