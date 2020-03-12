import Vue from 'vue';
import Vuex from 'vuex';

import VuexEasyFirestore from 'vuex-easy-firestore';
import { firebase, initFirebase } from '../plugins/firebase';

import auth from './auth';
import projects from './projects';

Vue.use(Vuex);

const easyFirestore = VuexEasyFirestore(
  [projects],
  { logging: true, FirebaseDependency: firebase },
);

const storeData = {
  plugins: [easyFirestore],
  modules: { auth },
};

// initialise Vuex
const store = new Vuex.Store(storeData);

// initFirebase
initFirebase()
  .catch((error) => {
    console.log(error);
  });

export default store;
