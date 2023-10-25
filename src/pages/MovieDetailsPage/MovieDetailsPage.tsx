import { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ROUTES, Status } from '../../consts';
import FetchMovies from '../../services/themoviedb-api';
import GoBackButton from '../../components/GoBackButton';
import Styles from './MovieDetailsPage.module.css';
import { AxiosError } from 'axios';

import type { MovieDetails } from 'types';

const fetchMovies = new FetchMovies();

export default function MovieDetailsPage() {
  const [status, setStatus] = useState<string>(Status.PENDING);
  const [error, setError] = useState<AxiosError | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovies
      .getMovieDetails(movieId)
      .then(movieDetails => {
        setMovieDetails(movieDetails);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

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
        {movieDetails && (
          <>
            <GoBackButton />
            <div className={Styles['movie-info']}>
              {movieDetails.posterPath ? (
                <picture>
                  <source
                    srcSet={`https://image.tmdb.org/t/p/w342${movieDetails.posterPath} 1x,
                https://image.tmdb.org/t/p/w780${movieDetails.posterPath} 2x`}
                    type="image/jpeg"
                  />
                  <img src="#" alt={movieDetails.title} />
                </picture>
              ) : (
                <img
                  src="https://media.istockphoto.com/photos/single-dia-slide-35mm-film-snip-under-different-flash-light-settings-picture-id1323720288?b=1&k=20&m=1323720288&s=170667a&w=0&h=XCA6bix_4uuiWXqDj1_hsYMhAz_loXVFQ9jYx-F47qE="
                  alt={movieDetails.title}
                ></img>
              )}

              <div className={Styles['movie-info-description']}>
                <h2>
                  {movieDetails.title} ({movieDetails.year})
                </h2>
                <p className={Styles.text}>User score: {movieDetails.score}</p>
                <h3>Overview</h3>
                <p className={Styles.text}>{movieDetails.overview}</p>
                <h3>Genres</h3>
                <p className={Styles.text}>{movieDetails.genres}</p>
              </div>
            </div>
            <div className={Styles['additional-info-container']}>
              <h2>Additional information</h2>
              <nav>
                <ul>
                  <li>
                    <Link to={ROUTES.CAST} replace>
                      Cast
                    </Link>
                  </li>
                  <li>
                    <Link to={ROUTES.REVIEWS} replace>
                      Reviews
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Outlet context={movieId} />
          </>
        )}
      </>
    );
  }
}
