import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import FetchMovies from '../../services/themoviedb-api';
import { ROUTES, Status } from '../../consts';
import Styles from './HomePage.module.css';
import { AxiosError } from 'axios';

import type { Movie } from 'types';

const fetchMovies = new FetchMovies();

export default function HomeView() {
  const [status, setStatus] = useState<string>(Status.PENDING);
  const [error, setError] = useState<AxiosError | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies
      .getTrendingMovies()
      .then(trendingMovies => {
        setTrendingMovies(trendingMovies);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.PENDING) {
    return (
      <div>
        <Loader type="Puff" color="#00BFFF" height={300} width={300} />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <p>Error fetching data: {error?.message}</p>;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <h1 className={Styles.heading}>Trending today</h1>
        {trendingMovies.length !== 0 && (
          <ul>
            {trendingMovies.map(movie => (
              <li key={movie.id} className={Styles['list-item']}>
                <Link to={`${ROUTES.MOVIES}/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
