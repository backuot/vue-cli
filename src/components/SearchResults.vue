<template>
  <Section :class="$style.section">
    <Container :class="$style.container">
      <div
        v-if="movies.length"
        :class="$style.searchResults"
      >
        <div
          v-for="movie in movies"
          :class="$style.movie"
          :key="movie.id"
          @click="onMovieClicked(movie.id)"
        >
          <img
            :class="$style.moviePosterImg"
            v-lazy="{ src: movie.posterUrl, loading: require('@/assets/images/png/loading.png') }"
            alt="Movie poster"
          />
          <div :class="$style.movieTitleContainer">
            <span :class="$style.movieTitle">
            {{ movie.title }}
          </span>
            <span :class="$style.movieYear">
            {{ movie.year }}
          </span>
          </div>
          <span :class="$style.movieGenres">
            {{ genresText(movie.genres) }}
          </span>
        </div>
      </div>
      <span
        :class="$style.notFoundText"
        v-else
      >
        No films found
      </span>
    </Container>
  </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/ui/Section.vue';
import Container from '@/components/ui/Container.vue';
import { Movie } from '@/interfaces/types';
import filters from '@/utlis/filters';

@Options({
  components: {
    Section,
    Container,
  },
  props: {
    movies: Array,
    default: () => [],
  },
  emits: ['movie-clicked'],
})
export default class SearchResults extends Vue {
  genresText = filters.genresText;

  onMovieClicked(id: string): void {
    this.$emit('movie-clicked', id);
  }
}
</script>

<style lang="scss" module>
.section {
  background-color: #232323;
}

.container {
  padding: 0 48px;
  min-height: 100vh;
}

.searchResults {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 44px;
}

.notFoundText {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 38px;
  line-height: 1;
  color: white;
}

.movie {
  display: inline-block;
  margin-bottom: 32px;
  color: #b7b7b7;
  cursor: pointer;
}

.moviePosterImg {
  min-width: 280px;
  height: 420px;
}

.movieTitleContainer {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.movieTitle {
  font-size: 16px;
}

.movieYear {
  padding: 2px 16px;
  border: 1px solid #424242;
  border-radius: 4px;
  font-size: 14px;
}

.movieGenres {
  font-size: 12px;
}
</style>
