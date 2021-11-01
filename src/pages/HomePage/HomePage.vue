<template>
  <div class="HomePage">
    <div class="HomePage__shows-slider">
      <ShowsSlider ref="slider" :options="showsSliderOptions">
        <div :key="index" :class="`slide--${index}`" v-for="(show, index) in showsList">
          <ShowDetails :show="show"/>
        </div>
      </ShowsSlider>
    </div>
    <div class="HomePage__slider-list">
      <ShowsList :key="title" v-for="[title, value] in showsWithGenres" :category-title="title" :shows="value"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ShowsSlider from '../../components/ShowsSlider/ShowsSlider.vue';
import ShowDetails from '../../components/ShowDetails/ShowDetails.vue';
import ShowsList from '../../components/ShowsList/ShowsList.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      showsList: [],
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
    ShowDetails,
    ShowsList
  },
  mounted() {
    this.$refs.slider.toggleLoading();
    this.$refs.slider.disableAutoPlay();

    axios.get('https://api.tvmaze.com/shows')
        .then(response => {
          this.showsList = response.data.filter(res => res.image != null).map(show => {
            return {...show, image: show.image.original}
          }).splice(0, 10);

          this.topRatedShowsList = response.data.filter(res => res.rating != null && res.rating.average > 8).map(show => {
            return {...show, image:show.image.original }
          }).splice(10, 10);

          response.data.filter(res => res.genres != null && res.genres.length !== 0).map(show => {
            return this.genres.push(...show.genres);
          });
          this.genres = [...new Set(this.genres)];

          this.showsWithGenres.set("Top Rated", this.topRatedShowsList);
          this.genres.forEach(genre => {
            this.showsList.forEach(show => {
              if(show.genres.includes(genre)){
                if(this.showsWithGenres.has(genre)){
                  this.showsWithGenres.get(genre).push(show);
                }else {
                  let newArray = [];
                  newArray.push(show);
                  this.showsWithGenres.set(genre, newArray);
                }
              }
            })
          })

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
