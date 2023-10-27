import axios from 'axios';

import {
  Movie,
  IMovies,
  MovieDetails,
  IMovieDetails,
  CastType,
  ICast,
  Review,
  IReview,
} from 'types';

export default class FetchMovies {
  KEY: string;
  TRENDING_MOVIES_PARAMETERS: string;
  MOVIE_DETAILS_PARAMETERS: string;
  CAST_PARAMETERS: string;
  REVIEWS_PARAMETERS: string;
  SEARCH_PARAMETERS: string;

  constructor() {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
    this.KEY = 'ec0d6416fe23d598a686f5996c6cceae';
    this.TRENDING_MOVIES_PARAMETERS = '/trending/movie/day';
    this.MOVIE_DETAILS_PARAMETERS = '/movie';
    this.CAST_PARAMETERS = '/movie';
    this.REVIEWS_PARAMETERS = '/movie';
    this.SEARCH_PARAMETERS = 'search/movie';
  }

  async getTrendingMovies(): Promise<Movie[]> {
    const parameters = `${this.TRENDING_MOVIES_PARAMETERS}?api_key=${this.KEY}`;

    const response = await axios.get<IMovies>(parameters);
    return response.data.results.map(({ id, original_title }) => {
      return { id, title: original_title };
    });
  }

  async getMovieDetails(movieId: string): Promise<MovieDetails> {
    const parameters = `${this.MOVIE_DETAILS_PARAMETERS}/${movieId}?api_key=${this.KEY}`;

    const response = await axios.get<IMovieDetails>(parameters);
    const { poster_path, original_title, release_date, vote_average, overview, genres } =
      response.data;

    return {
      posterPath: poster_path,
      title: original_title ?? 'No information',
      year: this.getReleaseYear(release_date),
      score: this.getUserScore(vote_average),
      overview: overview ?? 'No information',
      genres: this.getGenres(genres),
    };
  }

  getReleaseYear(releaseDate: string | null | undefined) {
    if (!releaseDate) return 'No information';
    return releaseDate.split('-')[0];
  }

  getUserScore(voteAverage: string | null | undefined) {
    if (!voteAverage) return 'No information';
    return Math.round(Number(voteAverage) * 10) + '%';
  }

  getGenres(genresArray: { name: string }[] | null | undefined) {
    if (!genresArray) return 'No information';
    return genresArray.map(genre => genre.name).join(', ');
  }

  async getCast(movieId: string): Promise<CastType[]> {
    const parameters = `${this.CAST_PARAMETERS}/${movieId}/credits?api_key=${this.KEY}`;

    const response = await axios.get<ICast>(parameters);
    return response.data.cast.map(({ profile_path, name, character }) => {
      return {
        profile: profile_path,
        name: name ?? 'No information',
        character: character ?? 'No information',
      };
    });
  }

  async getReviews(movieId: string): Promise<Review[]> {
    const parameters = `${this.REVIEWS_PARAMETERS}/${movieId}/reviews?api_key=${this.KEY}&language=en-US`;

    const response = await axios.get<IReview>(parameters);
    return response.data.results.map(({ author, content }) => {
      return {
        author: author ?? 'No information',
        content: content ?? 'No information',
      };
    });
  }

  async getMoviesByQuery(searchQuery: string): Promise<Movie[]> {
    const parameters = `${this.SEARCH_PARAMETERS}?api_key=${this.KEY}&query=${searchQuery}&include_adult=false`;

    const response = await axios.get<IMovies>(parameters);
    return response.data.results.map(({ id, original_title }) => {
      return { id, title: original_title };
    });
  }
}
