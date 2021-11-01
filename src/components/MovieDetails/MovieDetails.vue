<template>
<!--  <div class="MovieDetails" :style="{ backgroundImage: getBackgroundImageUrl(movie.backdrop_path, 2) }">-->
  <div class="MovieDetails" :style="{ backgroundImage: `url(${movie.image})` }">
    <div class="MovieDetails__fade--top" />
    <div class="MovieDetails__wrapper">
      <h1 class="MovieDetails__title">
        {{ movie.name }}
<!--        {{getBackgroundImageUrl(movie.backdrop_path, 2)}}-->
      </h1>
      <p class="MovieDetails__description">
        Genres: <span>{{ movieGenres }}</span>
      </p>
      <p class="MovieDetails__description">
        Rating: <span>{{ movie.rating.average }}</span>
      </p>
      <p class="MovieDetails__description">
        Language: <span>{{ movie.language }}</span>
      </p>
      <p class="MovieDetails__description">
        Premiered On: <span>{{ movie.premiered }}</span>
      </p>
      <div class="MovieDetails__details">
      <p>
        <span>{{ movieSummary }}</span>
      </p>
      </div>
<!--      <MovieLabels :movie="movie" />-->
<!--      <div class="MovieDetails__details">-->
<!--        <p class="MovieDetails__description">
          {{ movie.overview }}
        </p>
        <p class="MovieDetails__description">
          Genres: <span class="MovieDetails__description&#45;&#45;white">{{ movieGenres }}</span>
        </p>-->
<!--        <button v-if="!isMovieInMyList" type="button" class="btn MovieDetails__btn" @click="addMovieToMyList">
          <font-awesome-icon :icon="['fas', 'plus']" class="MovieDetails__btn-icon" fixed-width /> My List
        </button>
        <button v-else type="button" class="btn MovieDetails__btn" @click="removeMovieFromMyList">
           <font-awesome-icon :icon="['fas', 'minus']" class="MovieDetails__btn-icon" fixed-width /> My List
        </button>-->
<!--      </div>-->
    </div>
    <div class="MovieDetails__fade--bottom" />
  </div>
</template>

<script>
  //import MovieLabels from '../MovieLabels/MovieLabels';
  //import getImageUrl from '../../helpers/getImageUrl';
  import { actions } from '@/constants/constants';

  export default {
    name: 'MovieDetails',
    props: {
      movie: {
        id: Number,
        name: String,
        //title: String,
        //overview: String,
        genres: Array,
        image: String,
        rating: Object,
        language: String,
        premiered: String,
        summary: String
        //backdrop_path: String
      },
    },
    computed: {
      movieSummary(){
        return this.movie.summary.replace( /(<([^>]+)>)/ig, '');
      },
      movieGenres() {
        return this.movie.genres.join(', ');
        /*if (!this.$store.getters.genres) return '';
        return this.$store.getters.genres.movies
          .filter(({ id }) => this.movie.genre_ids.includes(id))
          .map(({ name }) => name)
          .join(', ');*/
      },
      isMovieInMyList() {
        return this.$store.getters.myList.find(({ id }) => id === this.movie.id);
      },
    },
    components: {
      //MovieLabels,
    },
    methods: {
      getBackgroundImageUrl(url, size) {
        return `url(${getImageUrl(url, size, 'backdrop')})`;
      },
      addMovieToMyList() {
        this.$store.dispatch(actions.addMovieToMyList, { 
          movie: this.movie,
        });
      },
      removeMovieFromMyList() {
        this.$store.dispatch(actions.removeMovieFromMyList, { 
          movie: this.movie,
        });
      },
    },
  }
</script>

<style lang="scss">
  @import 'MovieDetails';
</style>
