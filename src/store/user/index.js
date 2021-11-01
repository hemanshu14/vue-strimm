import * as firebase from "firebase";
import router from '../../router/index';
import { routes, actions } from '@/constants/constants';

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    signUp({ commit }, payload) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit(actions.setLoading, false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    signIn({ commit }, payload) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit(actions.setLoading, false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    autoSignIn({ commit }, payload) {
      commit(actions.setUser, {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL,
      });
    },

    signInWithGoogleId({ commit }) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => {
          commit(actions.setLoading, false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    signInAnonymously({ commit }) {
      commit(actions.setLoading, true);
      commit(actions.clearError);
      firebase
        .auth()
        .signInAnonymously()
        .then(user => {
          commit(actions.setLoading, false);
          console.log(user);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };
          commit(actions.setUser, newUser);
        })
        .catch(error => {
          commit(actions.setLoading, false);
          commit(actions.setError, error);
        });
    },

    logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit(actions.setUser, null);
          router.push(routes.beginPage);
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
