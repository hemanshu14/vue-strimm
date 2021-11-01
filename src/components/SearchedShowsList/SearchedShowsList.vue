<template>
  <div class="SearchedShowsList__wrapper">
    <transition name="fade">
      <div class="SearchedShowsList" v-if="showsList.length !== 0">
        <ShowListItem
          v-for="(show, index) in showsList"
          :key="index"
          :show="show"
        />
      </div>
      <div v-else-if="!loading && showsList.length === 0" class="SearchedShowsList__empty">
        {{ emptyTitle }}
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios';
  import ShowListItem from '../ShowListItem/ShowListItem';

  export default {
    name: 'SearchedShowsList',
    props: {
      requestUrl: String,
      emptyListTitle: String,
    },
    data () {
      return {
        emptyTitle: this.emptyListTitle || 'No data here',
        showsList:  [],
        selectedMovie: null,
        currentPage: 1,
        totalPages: 0,
        loading: false,
      };
    },
    components: {
      ShowListItem,
    },
    watch: {
      requestUrl(value) {
        if (value !== null && value !== undefined) {
          this.loadMovies();
        }
      },
      emptyListTitle(value) {
        this.emptyTitle = value;
      },
    },
    methods: {
      toggleLoading() {
        this.loading = !this.loading;
      },
      loadMovies() {
        let { query } = this.$route;
        const params = { page: 1 };
        for (let key in query) {
          params[key] = decodeURIComponent(query[key]);
        }

        if (!this.requestUrl) return;

        this.toggleLoading();
        axios.get(`https://api.tvmaze.com/${this.requestUrl}`, { params })
            .then(response => {
              this.showsList = [];
              response.data.forEach(res => {
                if(res.show.image != null) {
                  res.show.image = res.show.image.original;
                  this.showsList.push(res.show);
                }
              })
            })
            .then(() => {
              window.scrollTo(0, 0);
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              this.toggleLoading();
            });
      },
    },
    mounted() {
      this.loadMovies();
    },
  }
</script>

<style lang="scss">
  @import 'SearchedShowsList';
</style>
