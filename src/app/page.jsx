"use client";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import styles from '../styles/home.module.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setPage(1); // Reset page to 1
    setResults([]);
    setHasMore(true);
    await fetchResults(1);
  };

  const fetchResults = useCallback(async (pageNumber) => {
    if (loading) return;

    setLoading(true);

    try {
      const [moviesResponse, seriesResponse] = await Promise.all([
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: query,
            page: pageNumber,
          },
        }),
        axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: query,
            page: pageNumber,
          },
        }),
      ]);

      const combinedResults = [
        ...moviesResponse.data.results.map(item => ({
          ...item,
          media_type: 'movie',
        })),
        ...seriesResponse.data.results.map(item => ({
          ...item,
          media_type: 'tv',
        })),
      ];

      setResults(prevResults => [...prevResults, ...combinedResults]);
      setHasMore(combinedResults.length > 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the search results:', error);
      setLoading(false);
    }
  }, [query, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (nearBottom && hasMore && !loading) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchResults(nextPage);
          return nextPage;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchResults, hasMore, loading]);

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1>Welcome to the Movie and Series App</h1>
            <p>Browse and search for popular movies and TV series.</p>
          </div>
        </div>

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
                (result.media_type === 'movie' || result.media_type === 'tv') && (
                  <li key={result.id}>
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`} 
                      alt={result.title || result.name} 
                    />
                    <div className={styles.itemDetails}>
                      <h3>{result.title || result.name}</h3>
                      <p>{result.overview}</p>
                    </div>
                    {result.vote_average && (
                      <div className={styles.rating}>
                        {result.vote_average.toFixed(1)}
                      </div>
                    )}
                  </li>
                )
              ))}
            </ul>
            {loading && <div className={styles.loader}>Loading...</div>}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
