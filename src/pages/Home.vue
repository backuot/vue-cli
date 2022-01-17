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
    :movies="store.state.movies"
    @movie-clicked="onMovieClicked"
  />
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import { key } from '@/store';
import Hero from '@/components/Hero.vue';
import Footer from '@/components/Footer.vue';
import SearchResults from '@/components/SearchResults.vue';
import Header from '@/components/Header.vue';
import SearchPanel from '@/components/SearchPanel.vue';
import MoviePanel from '@/components/MoviePanel.vue';
import SortPanel from '@/components/SortPanel.vue';
import filters from '@/utlis/filters';

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
  content = {
    movie: {},
  };

  store: any = {}

  currentGenres: string[] = [];

  currentResultsCount = 0;

  isSearchPanelVisible = true;

  isSearchButtonVisible = false;

  isSortRadioVisible = true;

  created(): void {
    this.store = useStore(key);
    this.store.commit('resetMovies');
    this.onSortChanged(0);
  }

  onSearch(value: string, option: number): void {
    if (!value) {
      return;
    }

    this.store.commit('resetMovies');
    this.store.commit('searchMovies', { value, option });
    this.currentResultsCount = this.store.state.movies.length;
  }

  onSearchClicked(): void {
    this.isSearchPanelVisible = true;
    this.isSearchButtonVisible = false;
    this.isSortRadioVisible = true;
    this.currentGenres = [];
    this.store.commit('resetMovies');
    this.onSortChanged(0);
    this.currentResultsCount = 0;
  }

  onMovieClicked(id: string): void {
    if (this.isSearchPanelVisible) {
      this.isSearchPanelVisible = false;
      this.isSearchButtonVisible = true;
      this.isSortRadioVisible = false;
    }
    const movie = this.store.getters.getMovie(id);
    this.content.movie = movie;
    this.store.commit('filterMovies', movie.genres);
    this.currentGenres = movie.genres;
    window.scrollTo(0, 0);
  }

  onSortChanged(value: number): void {
    this.store.commit('sortMovies', { value });
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
