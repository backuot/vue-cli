import { Movie } from '@/interfaces/types';

export function itemsToMovies(data: any): Movie[] {
  return data.default.movies.map((item: any) => ({
    id: item.id,
    title: item.title,
    year: item.year,
    runtime: item.runtime,
    genres: item.genres,
    director: item.director,
    actors: item.actors,
    plot: item.plot,
    posterUrl: item.posterUrl,
    rating: item.rating,
  }));
}
