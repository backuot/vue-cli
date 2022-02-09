import { InjectionKey } from 'vue';
import {
  createStore,
  Store,
  ActionTree,
  GetterTree,
  MutationTree,
} from 'vuex';
import { State, Movie } from '@/interfaces/types';
import MoviesAPI from '@/api/movies';

export const key: InjectionKey<Store<State>> = Symbol('Store injection');

const actions: ActionTree<State, any> = {
  fetchMovies(store, params) {
    return MoviesAPI.getMovies(params).then((movies: Movie[]) => {
      store.commit('setMovies', movies);
    });
  },
};

const getters: GetterTree<State, any> = {
  getMovie: (state: State) => (id: string): Movie | undefined => (
    state.movies.find((movie: Movie) => movie.id === id)
  ),
};

const mutations: MutationTree<State> = {
  setMovies(state, movies): void {
    state.movies = movies;
  },
};

const state: State = {
  movies: [],
};

export const store = createStore<State>({
  actions,
  getters,
  mutations,
  state,
});
