export const routes = {
  beginPage: '/',
  signInPage: '/sign-in',
  signUpPage: '/sign-up',
  recoverPassword: '/recover-password',
  recoverPasswordSuccess: '/recover-password/success',
  recoverPasswordCode: '/recover-password/:code',

  homePage: '/home-page',
  tvShows: '/tv-shows',
  movies: '/movies',
  popular: '/popular',
  myList: '/my-list',
  search: '/search',
  showDetails: '/show-details'
};

export const actions = {
  signUp: 'signUp',
  signIn: 'signIn',
  autoSignIn: 'autoSignIn',
  signInGoogle: 'signInGoogle',
  signInFacebook: 'signInFacebook',
  signInAnonymously: 'signInAnonymously',
  recoverPassword: 'recoverPassword',
  recoverPasswordWithEmail: 'recoverPasswordWithEmail',
  logout: 'logout',
  setUser: 'setUser',
  setLoading: 'setLoading',
  setGenres: 'setGenres',
  setConfiguration: 'setConfiguration',
  setError: 'setError',
  clearError: 'clearError',
  setMyList: 'setMyList',
  addMovieToMyList: 'addMovieToMyList',
  removeMovieFromMyList: 'removeMovieFromMyList',
};
