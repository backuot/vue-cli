<template>
  <div :class="$style.moviePanel">
    <img
      :class="$style.moviePosterImg"
      :src="movie.poster_path"
      alt="Movie poster"
    />
    <div :class="$style.movieDetails">
      <div :class="$style.movieTitleContainer">
        <span :class="$style.movieTitle">{{ movie.title }}</span>
        <span :class="$style.movieRating">{{ movie.vote_average }}</span>
      </div>
      <span :class="$style.movieGenres">{{ genresText(movie.genres) }}</span>
      <div :class="$style.timeContainer">
        <span :class="$style.year">{{ yearText(movie.release_date) }}</span>
        <span :class="$style.duration">{{ durationText(movie.runtime) }}</span>
      </div>
      <p :class="$style.plot">{{ movie.plot }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import filters from '@/utlis/filters';

@Options({
  props: {
    movie: Object,
    default: () => ({}),
  },
})
export default class MoviePanel extends Vue {
  genresText = filters.genresText;

  durationText = filters.durationText;

  yearText = filters.yearText;
}
</script>

<style lang="scss" module>
.moviePanel {
  display: flex;
  justify-content: start;
  width: 100%;
  padding-top: 14px;
  padding-bottom: 44px;
}

.moviePosterImg {
  display: block;
  height: 350px;
  margin-right: 40px;
}

.movieDetails {
  width: 100%;
  color: white;
}

.movieTitleContainer {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 2px;
}

.movieTitle {
  font-size: 32px;
  line-height: 1;
  margin-right: 10px;
}

.movieRating {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 1;
  width: 40px;
  height: 40px;
  color: #a1e66f;
  border-radius: 50%;
  border: 1px solid white;
}

.movieGenres {
  display: block;
  font-size: 14px;
  margin-bottom: 20px;
}

.timeContainer {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  width: 150px;
  color: #f65261;
}

.year {
}
</style>
