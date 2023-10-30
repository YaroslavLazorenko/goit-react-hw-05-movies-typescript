import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import AppBar from './components/AppBar';
import ApiInfo from './components/ApiInfo';
import './App.css';
import { ROUTES } from './consts';

const HomePage = lazy(() => import('./pages/HomePage' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */),
);
const Cast = lazy(() => import('./pages/Cast' /* webpackChunkName: "cast-subpage" */));
const Reviews = lazy(() => import('./pages/Reviews' /* webpackChunkName: "reviews-subpage" */));

function App() {
  return (
    <>
      <AppBar />
      <main>
        <ToastContainer autoClose={3000} />
        <Suspense
          fallback={
            <div>
              <Loader type="Puff" color="#00BFFF" height={300} width={300} />
            </div>
          }
        >
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={`/${ROUTES.MOVIES}`} element={<MoviesPage />} />
            <Route path={`/${ROUTES.MOVIE_DETAILS}`} element={<MovieDetailsPage />}>
              <Route path={ROUTES.CAST} element={<Cast />} />
              <Route path={ROUTES.REVIEWS} element={<Reviews />} />
            </Route>
            <Route path="/*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Suspense>
      </main>
      <ApiInfo />
    </>
  );
}

export default App;
