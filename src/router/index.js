import * as firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '@/constants/constants';
import BeginPage from "@/pages/BeginPage/BeginPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import HomePage from "@/pages/HomePage/HomePage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";


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
    }
    /*{
      path: routes.signIn,
      name: 'SignIn',
      component: SignIn,
    }*/
    /*{
      path: routes.startNow,
      name: 'StartNow',
      component: StartNow,
    },
    {
      path: routes.signIn,
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: routes.signUp,
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: routes.recoverPassword,
      name: 'RecoverPassword',
      component: RecoverPassword,
    },
    {
      path: routes.recoverPasswordSuccess,
      name: 'RecoverPasswordSuccess',
      component: RecoverPasswordSuccess,
    },
    {
      path: routes.recoverPasswordCode,
      name: 'RecoverPasswordForm',
      component: RecoverPasswordForm,
    },
    {
      path: routes.home,
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: `${routes.showDetails}/:showId`,
      name: 'ShowDetails',
      component: ShowDetails,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: `${routes.movies}/:id` ,
      name: 'Movies',
      component: Movies,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: `${routes.tvShows}/:id`,
      name: 'TVShows',
      component: TVShows,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: routes.popular,
      name: 'Popular',
      component: Popular,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: routes.myList,
      name: 'My List',
      component: MyList,
      meta: {
        requiresAuth: true,
      },
    },
    {
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
