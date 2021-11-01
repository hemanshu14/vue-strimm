<template>
  <div class="page__content">
    <h1 class="page__title">
      Search
    </h1>
    <SearchedShowsList
        :request-url="'/search/shows?q=' + search"
        :empty-list-title="'Your search for ' + search + ' did not have any matches.'"
    />
  </div>
</template>

<script>
import SearchedShowsList from '../../components/SearchedShowsList/SearchedShowsList';

export default {
  name: 'Search',
  data() {
    return {
      search: this.$route.params.search,
    };
  },
  computed: {
    query() {
      return this.$route.params.search;
    },
  },
  components: {
    SearchedShowsList,
  },
  watch: {
    query(value) {
      if (value !== null && value !== undefined) {
        this.search = this.$route.params.search;
      }
    },
  },
}
</script>
