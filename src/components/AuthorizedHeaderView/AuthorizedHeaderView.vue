<template>
  <header :class="[{ 'Header--bg': isScrolled }, 'Header']">
    <router-link :to="homeRoute">
      <Logo class="Header__logo" />
    </router-link>

<!--    <div class="Header__search" :class="[{ 'Header__search&#45;&#45;active': search }, 'Header__search']">
      <label class="flex-jc">
        <font-awesome-icon :icon="['fas', 'search']" class="Header__search-icon" />
        <input
            name="search"
            type="text"
            placeholder="Titles, characters, genres"
            v-model="search"
            class="Header__search-input"
        >
      </label>
    </div>-->

<!--    <div class="Header__actions">
      <ProfileDropdown />
      <button :class="[{ 'hamburger&#45;&#45;active': isMenuOpened }, 'hamburger', 'button']" v-on:click="toggleSidebar">
        <span />
        <span />
        <span />
      </button>
    </div>-->
  </header>
</template>

<script>
import Logo from '../../assets/images/srtimm-logo.svg';
import { routes, actions } from '@/constants/constants';

export default {
  name: 'AuthorizedHeaderView',
  data() {
    return {
      search: '',
      isScrolled: false,
      homeRoute: routes.homePage
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  components: {
    //ProfileDropdown,
    Logo,
  },
  watch: {
    /*search: debounce(function(value) {
      this.$router.push(`${routes.search}/${value}`);
    }, 600),*/
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition > 30) return this.isScrolled = true;
      else return this.isScrolled = false;
    },
    /*toggleSidebar() {
      this.isMenuOpened = !this.isMenuOpened;
      if (this.isMenuOpened) document.documentElement.classList.add('no-scroll');
      else document.documentElement.classList.remove('no-scroll');
    },*/
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    if (this.$route.params.search) {
      this.search = this.$route.params.search;
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss">
@import "./AuthorizedHeaderView.scss";
</style>
