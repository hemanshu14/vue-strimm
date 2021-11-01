import * as firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '@/constants/constants';
import BeginPage from "@/pages/BeginPage/BeginPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import HomePage from "@/pages/HomePage/HomePage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import ShowEpisodeDetails from "@/pages/ShowEpisodeDetails/ShowEpisodeDetails";
import Search from "@/pages/Search/Search";


Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: routes.beginPage,
      name: 'BeginPage',
      component: BeginPage,
    },
    {
      path: routes.signInPage,
      name: 'SignInPage',
      component: SignInPage,
    },
    {
      path: routes.homePage,
      name: 'HomePage',
      component: HomePage,
      meta: {
        authRequired: true,
      },
    },
    {
      path: routes.signUpPage,
      name: 'SignUp',
      component: SignUpPage,
    },
    {
      path: `${routes.showEpisodeDetails}/:showId`,
      name: 'ShowEpisodeDetails',
      component: ShowEpisodeDetails,
      meta: {
        authRequired: true,
      },
    },
    {
      path: `${routes.search}/:search`,
      name: 'Search',
      component: Search,
      meta: {
        authRequired: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const authRequired = to.matched.some(record => record.meta.authRequired);

  if (authRequired && !currentUser) next(routes.signIn);
  else if (!authRequired && currentUser) next(routes.homePage);
  else next();
});

export default router;
