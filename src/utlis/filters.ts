import { Movie } from '@/interfaces/types';

function genresText(genres: string[]): string {
  if (!genres) {
    return '';
  }

  return genres.join(', ');
}

function durationText(duration: string): string {
  return `${duration} min`;
}

function moviesByGenres(movies: Movie[], genres: string[]): Movie[] {
  return movies.filter((movie: Movie) => movie.genres
    .filter((genre: string) => genres.includes(genre)).length > 0);
}

function yearText(date: string) {
  return date.split('-')[0];
}

export default {
  genresText,
  durationText,
  moviesByGenres,
  yearText,
};
