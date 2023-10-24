import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import FetchMovies from '../../services/themoviedb-api';
import { Status } from '../../consts';
import Styles from './Reviews.module.css';
import { AxiosError } from 'axios';

import { Review } from 'types';

const fetchMovies = new FetchMovies();

export default function Reviews() {
  const [status, setStatus] = useState<string>(Status.PENDING);
  const [error, setError] = useState<AxiosError | null>(null);
  const movieId = useOutletContext<string>();

  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    fetchMovies
      .getReviews(movieId)
      .then(reviews => {
        setReviews(reviews);
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
    return <p>Error fetching data: {error && error.message}</p>;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {reviews.length === 0 ? (
          <p>We don't have any reviews for this movie.</p>
        ) : (
          <ul>
            {reviews.map(({ author, content }, idx) => {
              return (
                <li key={idx}>
                  <p className={Styles['author-text']}>Author: {author}</p>
                  <p className={Styles['review-text']}>{content}</p>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}
