export type MovieByQuery = {
  id: string;
  title: string;
};

export type Review = {
  author: string;
  content: string;
};

export type MovieDetails = {
  posterPath: string | null | undefined;
  title: string;
  year: string;
  score: string;
  overview: string;
  genres: string;
};
