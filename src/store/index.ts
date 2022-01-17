import { InjectionKey } from 'vue';
import {
  createStore,
  Store,
  GetterTree,
  MutationTree,
} from 'vuex';
import { State, Movie } from '@/interfaces/types';
import * as data from '@/api/movies.json';
import { itemsToMovies } from '@/utlis/mappers';
import {
  DATE_SORT_TYPE,
  RATING_SORT_TYPE,
  TITLE_FIND_TYPE,
  GENRE_FIND_TYPE,
} from '@/constants';
import filters from '@/utlis/filters';

export const key: InjectionKey<Store<State>> = Symbol('Store injection');

const getters: GetterTree<State, any> = {
  getMovie: (state: State) => (id: string): Movie | undefined => (
    state.movies.find((movie: Movie) => movie.id === id)
  ),
};

const mutations: MutationTree<State> = {
  sortMovies(state, { value }): void {
    state.movies.sort((a: Movie, b: Movie) => {
      if (value === DATE_SORT_TYPE) {
        return Number(b.year) - Number(a.year);
      }

      if (value === RATING_SORT_TYPE) {
        return Number(b.rating) - Number(a.rating);
      }

      return 0;
    });
  },
  searchMovies(state, { value, option }): void {
    state.movies = state.movies.filter((movie: Movie) => {
      const pattern = new RegExp(`^${value}`, 'i');

      if (option === TITLE_FIND_TYPE) {
        return pattern.test(movie.title);
      }

      if (option === GENRE_FIND_TYPE) {
        return movie.genres.some((genre: string) => pattern.test(genre));
      }

      return false;
    });
  },
  resetMovies(state): void {
    state.movies = itemsToMovies(data);
  },
  filterMovies(state, genres): void {
    state.movies = filters.moviesByGenres(state.movies, genres);
  },
};

const state: State = {
  movies: [],
};

export const store = createStore<State>({
  getters,
  mutations,
  state,
});
