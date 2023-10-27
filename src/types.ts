export type Movie = {
  id: string;
  title: string;
};

export interface IMovies {
  results: {
    id: string;
    original_title: string;
  }[];
}

export type Review = {
  author: string;
  content: string;
};

export interface IReview {
  results: {
    author: string | null | undefined;
    content: string | null | undefined;
  }[];
}

export type MovieDetails = {
  posterPath: string | null | undefined;
  title: string;
  year: string;
  score: string;
  overview: string;
  genres: string;
};

export interface IMovieDetails {
  poster_path: string | null | undefined;
  original_title: string | null | undefined;
  release_date: string | null | undefined;
  vote_average: string | null | undefined;
  overview: string | null | undefined;
  genres: { name: string }[] | null | undefined;
}

export type CastType = {
  profile: string | null | undefined;
  name: string;
  character: string;
};

export interface ICast {
  cast: {
    profile_path: string | null | undefined;
    name: string | null | undefined;
    character: string | null | undefined;
  }[];
}
