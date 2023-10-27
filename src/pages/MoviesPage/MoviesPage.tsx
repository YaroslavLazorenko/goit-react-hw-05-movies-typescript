import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import SearchBar from '../../components/SearchBar/SearchBar';
import FetchMovies from '../../services/themoviedb-api';
import { Status } from '../../consts';
import Styles from './MoviesPage.module.css';
import { AxiosError } from 'axios';

import type { Movie } from 'types';

const fetchMovies = new FetchMovies();

export default function MoviesPage() {
  const [status, setStatus] = useState<string>(Status.IDLE);
  const [error, setError] = useState<AxiosError | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [moviesByQuery, setMoviesByQuery] = useState<Movie[]>([]);
  let navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get('query');

  useEffect(() => {
    if (searchParameter) {
      setSearchQuery(searchParameter);
      setStatus(Status.PENDING);
    } else {
      setMoviesByQuery([]);
    }
  }, [searchParameter]);

  const handleSubmitSearchQuery = (searchQuery: string): void => {
    setSearchQuery(searchQuery);
    navigate(`?query=${searchQuery}`);
  };

  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchMovies
      .getMoviesByQuery(searchQuery)
      .then(moviesByQuery => {
        setMoviesByQuery(moviesByQuery);
        setStatus(Status.RESOLVED);
      })
      .catch((error:AxiosError) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  if (status === Status.PENDING) {
    return (
      <div>
        <Loader type="Puff" color="#00BFFF" height={300} width={300} />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <p>Error fetching data: {error?.message?? "Unknown error"}</p>;
  }

  if (status === Status.RESOLVED || status === Status.IDLE) {
    return (
      <div className={Styles.container}>
        <SearchBar onSubmitSearchQuery={handleSubmitSearchQuery} />
        {status === Status.IDLE && <p>Please, enter your search query to find movies.</p>}
        {moviesByQuery.length === 0 && status === Status.RESOLVED && (
          <p>There are no movies was found by your search query. Please, try another request.</p>
        )}
        {moviesByQuery.length !== 0 && status === Status.RESOLVED && (
          <ul>
            {moviesByQuery.map(movie => (
              <li key={movie.id}>
                <Link to={`${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
