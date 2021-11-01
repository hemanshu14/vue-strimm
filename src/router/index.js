import * as firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '@/constants/constants';
import BeginPage from "@/pages/BeginPage/BeginPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import HomePage from "@/pages/HomePage/HomePage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import ShowEpisodeDetails from "@/pages/ShowEpisodeDetails/ShowEpisodeDetails";


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
        requiresAuth: true,
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
        requiresAuth: true,
      },
    },
    /*{
      path: `${routes.search}/:search`,
      name: 'Search',
      component: Search,
      meta: {
        requiresAuth: true,
      },
    },*/
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next(routes.signIn);
  else if (!requiresAuth && currentUser) next(routes.home);
  else next();
});

export default router;
