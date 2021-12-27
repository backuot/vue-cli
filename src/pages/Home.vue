<template>
  <Hero>
    <template v-slot:header>
      <Header
        :is-search-button-visible="isSearchButtonVisible"
        @search="onSearchClicked"
      />
    </template>
    <template v-slot:content>
      <component
        :is="contentComponent"
        v-bind="content"
        @search="onSearch"
      />
    </template>
  </Hero>
  <SortPanel
    :text="sortPanelText"
    :is-sort-radio-visible="isSortRadioVisible"
    @sort-changed="onSortChanged"
  />
  <SearchResults
    :movies="movies"
    @movie-clicked="onMovieClicked"
  />
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
import SearchResults from '@/components/SearchResults.vue';
import * as data from '@/api/movies.json';
import { Movie } from '@/interfaces/types';
import Header from '@/components/Header.vue';
import SearchPanel from '@/components/SearchPanel.vue';
import MoviePanel from '@/components/MoviePanel.vue';
import SortPanel from '@/components/SortPanel.vue';
import filters from '@/utlis/filters';

const DATE_SORT_TYPE = 0;
const RATING_SORT_TYPE = 1;
const TITLE_FIND_TYPE = 0;
const GENRE_FIND_TYPE = 1;

@Options({
  components: {
    SortPanel,
    Header,
    SearchResults,
    Footer,
    Hero,
  },
})
export default class Home extends Vue {
  movies: Movie[] = [];

  content = {
    movie: {},
  }

  currentGenres: string[] = [];

  currentResultsCount = 0;

  isSearchPanelVisible = true;

  isSearchButtonVisible = false;

  isSortRadioVisible = true;

  created(): void {
    this.resetMovies();
    this.onSortChanged(0);
  }

  onSearch(value: string, option: number): void {
    if (!value) {
      return;
    }

    this.resetMovies();

    this.movies = this.movies.filter((movie: Movie) => {
      const pattern = new RegExp(`^${value}`, 'i');

      if (option === TITLE_FIND_TYPE) {
        return pattern.test(movie.title);
      }

      if (option === GENRE_FIND_TYPE) {
        return movie.genres.some((genre: string) => pattern.test(genre));
      }

      return false;
    });

    this.currentResultsCount = this.movies.length;
  }

  onSearchClicked(): void {
    this.isSearchPanelVisible = true;
    this.isSearchButtonVisible = false;
    this.isSortRadioVisible = true;
    this.currentGenres = [];
    this.resetMovies();
    this.onSortChanged(0);
    this.currentResultsCount = 0;
  }

  onMovieClicked(movie: Movie): void {
    if (this.isSearchPanelVisible) {
      this.isSearchPanelVisible = false;
      this.isSearchButtonVisible = true;
      this.isSortRadioVisible = false;
    }
    this.content.movie = movie;
    this.movies = filters.moviesByGenres(this.movies, movie.genres);
    this.currentGenres = movie.genres;
    window.scrollTo(0, 0);
  }

  onSortChanged(value: number): void {
    this.movies.sort((a: Movie, b: Movie) => {
      if (value === DATE_SORT_TYPE) {
        return Number(b.year) - Number(a.year);
      }

      if (value === RATING_SORT_TYPE) {
        return Number(b.rating) - Number(a.rating);
      }

      return 0;
    });
  }

  resetMovies(): void {
    this.movies = data.movies as never || [];
  }

  get contentComponent(): any {
    return this.isSearchPanelVisible ? SearchPanel : MoviePanel;
  }

  get sortPanelText(): string {
    if (this.currentGenres.length) {
      return `Films by
        ${filters.genresText(this.currentGenres)}
        ${this.currentGenres.length > 1 ? 'genres' : 'genre'}
      `;
    }

    if (this.currentResultsCount) {
      return `${this.currentResultsCount} movie found`;
    }

    return '';
  }
}
</script>

<style scoped>

</style>
