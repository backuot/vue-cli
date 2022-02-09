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
import { mapState, mapActions, mapGetters } from 'vuex';
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
import SearchResults from '@/components/SearchResults.vue';
import Header from '@/components/Header.vue';
import SearchPanel from '@/components/SearchPanel.vue';
import MoviePanel from '@/components/MoviePanel.vue';
import SortPanel from '@/components/SortPanel.vue';
import filters from '@/utlis/filters';
import { Movie } from '@/interfaces/types';
import {
  TITLE_FIND_TYPE,
  GENRE_FIND_TYPE,
  DATE_SORT_TYPE,
  RATING_SORT_TYPE,
  DESC_SORT_ORDER,
} from '@/constants';

@Options({
  components: {
    SortPanel,
    Header,
    SearchResults,
    Footer,
    Hero,
  },
  computed: {
    ...mapState({
      movies: 'movies',
    }),
    ...mapGetters({
      getMovie: 'getMovie',
    }),
  },
  methods: {
    ...mapActions({
      fetchMovies: 'fetchMovies',
    }),
  },
})
export default class Home extends Vue {
  content = {
    movie: {},
  };

  currentGenres: string[] = [];

  currentResultsCount = 0;

  currentOptions = {};

  isSearchPanelVisible = true;

  isSearchButtonVisible = false;

  isSortRadioVisible = true;

  movies!: Movie[];

  fetchMovies!: (params?: any) => Promise<void>;

  getMovie!: (id: string) => Movie;

  created(): void {
    this.onSortChanged(0);
  }

  onSearch(value: string, option: number): void {
    if (!value) {
      return;
    }

    Object.assign(this.currentOptions, {
      search: value,
      searchBy: option ? GENRE_FIND_TYPE : TITLE_FIND_TYPE,
    });

    this.fetchMovies({ ...this.currentOptions }).then(() => {
      this.currentResultsCount = this.movies.length;
    });
  }

  onSearchClicked(): void {
    this.isSearchPanelVisible = true;
    this.isSearchButtonVisible = false;
    this.isSortRadioVisible = true;
    this.currentGenres = [];
    this.currentResultsCount = 0;
    this.currentOptions = {};
    this.fetchMovies().then(() => {
      this.$router.replace('/');
    });
  }

  onMovieClicked(id: string): void {
    if (this.isSearchPanelVisible) {
      this.isSearchPanelVisible = false;
      this.isSearchButtonVisible = true;
      this.isSortRadioVisible = false;
    }

    const movie = this.getMovie(id);
    this.content.movie = movie;
    this.currentGenres = movie.genres;
    this.fetchMovies({ filter: movie.genres }).then(() => {
      this.$router.push('/movie');
      window.scrollTo(0, 0);
    });
  }

  onSortChanged(value: number): void {
    Object.assign(this.currentOptions, {
      sortBy: value ? RATING_SORT_TYPE : DATE_SORT_TYPE,
      sortOrder: DESC_SORT_ORDER,
    });

    this.fetchMovies({ ...this.currentOptions });
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
