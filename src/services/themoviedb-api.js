import axios from 'axios';

export default class FetchMovies {
  constructor() {
    axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
    this.KEY = 'ec0d6416fe23d598a686f5996c6cceae';
    this.TRENDING_MOVIES_PARAMETERS = '/trending/movie/day';
    this.MOVIE_DETAILS_PARAMETERS = '/movie';
    this.CAST_PARAMETERS = '/movie';
    this.REVIEWS_PARAMETERS = '/movie';
    this.SEARCH_PARAMETERS = 'search/movie';
  }

  async getTrendingMovies() {
    const parameters = `${this.TRENDING_MOVIES_PARAMETERS}?api_key=${this.KEY}`;

    const response = await axios.get(parameters);
    return response.data.results.map(({ id, original_title }) => {
      return { id, title: original_title };
    });
  }

  async getMovieDetails(movieId) {
    const parameters = `${this.MOVIE_DETAILS_PARAMETERS}/${movieId}?api_key=${this.KEY}`;

    const response = await axios.get(parameters);
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

  getReleaseYear(releaseDate) {
    if (!releaseDate) return 'No information';
    return releaseDate.split('-')[0];
  }

  getUserScore(voteAverage) {
    if (!voteAverage) return 'No information';
    return Math.round(Number(voteAverage) * 10) + '%';
  }

  getGenres(genresArray) {
    if (!genresArray) return 'No information';
    return genresArray.map(genre => genre.name).join(', ');
  }

  async getCast(movieId) {
    const parameters = `${this.CAST_PARAMETERS}/${movieId}/credits?api_key=${this.KEY}`;

    const response = await axios.get(parameters);
    return response.data.cast.map(({ profile_path, name, character }) => {
      return {
        profile: profile_path,
        name: name ?? 'No information',
        character: character ?? 'No information',
      };
    });
  }

  async getReviews(movieId) {
    const parameters = `${this.REVIEWS_PARAMETERS}/${movieId}/reviews?api_key=${this.KEY}&language=en-US`;

    const response = await axios.get(parameters);
    return response.data.results.map(({ author, content }) => {
      return {
        author: author ?? 'No information',
        content: content ?? 'No information',
      };
    });
  }

  async getMoviesByQuery(searchQuery) {
    const parameters = `${this.SEARCH_PARAMETERS}?api_key=${this.KEY}&query=${searchQuery}&include_adult=false`;

    const response = await axios.get(parameters);
    return response.data.results.map(({ id, original_title }) => {
      return { id, title: original_title };
    });
  }
}
