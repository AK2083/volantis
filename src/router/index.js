import Vue from 'vue';
import VueRouter from 'vue-router';
import FeaturesView from '../views/FeaturesView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: FeaturesView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
