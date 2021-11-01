<template>
  <div class="HomePage">
    <div class="HomePage__shows-slider">
      <ShowsSlider ref="slider" :options="showsSliderOptions">
        <div :key="index" :class="`slide--${index}`" v-for="(movie, index) in showsList">
          <MovieDetails :movie="movie"/>
        </div>
      </ShowsSlider>
    </div>
    <!--    <div class="Home__slider-list">
         <MovieSlider :key="title" v-for="[title, value] in showsWithGenres" :category-title="title" :shows="value" />
        </div>-->
  </div>
</template>

<script>
import axios from 'axios';
import ShowsSlider from '../../components/ShowsSlider/ShowsSlider.vue';
import MovieDetails from '../../components/MovieDetails/MovieDetails.vue';
//import MovieSlider from '../../components/MovieSlider/MovieSlider.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      showsList: [],
      //movieList: [],
      topRatedShowsList: [],
      showsWithGenres: new Map(),
      genres: [],
      showsSliderOptions: {
        dots: true,
        autoplay: true,
        slidesToShow: 1,
        autoplaySpeed: 5000,
        speed: 300,
        timing: 'ease-in-out',
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    ShowsSlider,
    MovieDetails,
    //MovieSlider,
  },
  mounted() {
    this.$refs.slider.toggleLoading();
    this.$refs.slider.disableAutoPlay();

    axios.get('https://api.tvmaze.com/shows')
        .then(response => {
          this.showsList = response.data.filter(res => res.image != null).map(show => {
            return {...show, image: show.image.original}
          }).splice(0, 10);
        })
        .then(() => {
          this.$refs.slider.reload();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$refs.slider.toggleLoading();
        });
  },
};
</script>

<style lang="scss">
@import 'HomePage';
</style>
