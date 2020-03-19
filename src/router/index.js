import Vue from 'vue';
import VueRouter from 'vue-router';

import FeaturesView from '../views/FeaturesView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import SequenceView from '../views/SequenceView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: FeaturesView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dash',
    component: DashboardView,
  },
  {
    path: '/sequence',
    name: 'seq',
    component: SequenceView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
