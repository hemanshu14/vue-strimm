<template>
  <div class="ShowDetails" :style="{ backgroundImage: `url(${show.image})` }">
    <div class="ShowDetails__fade--top"/>
    <div class="ShowDetails__wrapper">
      <h1 class="ShowDetails__title">
        {{ show.name }}
      </h1>
      <p class="ShowDetails__description">
        Genres: <span>{{ movieGenres }}</span>
      </p>
      <p class="ShowDetails__description">
        Rating: <span>{{ show.rating.average }}</span>
      </p>
      <p class="ShowDetails__description">
        Language: <span>{{ show.language }}</span>
      </p>
      <p class="ShowDetails__description">
        Premiered On: <span>{{ show.premiered }}</span>
      </p>
      <div class="ShowDetails__details">
        <p>
          <span>{{ showSummary }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShowDetails',
  props: {
    show: {
      id: Number,
      name: String,
      genres: Array,
      image: String,
      rating: Object,
      language: String,
      premiered: String,
      summary: String
    },
  },
  computed: {
    showSummary() {
      return this.show.summary.replace(/(<([^>]+)>)/ig, '');
    },
    movieGenres() {
      return this.show.genres.join(', ');
    }
  }
}
</script>

<style lang="scss">
@import 'ShowDetails';
</style>
