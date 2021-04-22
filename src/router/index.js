/* eslint implicit-arrow-linebreak: ["error", "beside"] */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';
import Auction from '../views/Auction.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import UserProfile from '../views/dashboard/UserProfile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auctions/:id',
    name: 'Auction',
    component: Auction,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      console.log('routeTo.params.id: ', routeTo.params.id);
      store.dispatch('auction/getBidDetail', routeTo.params.id).then((res) => {
        console.log('route response: ', res);
        console.log('routeTo.params: ', routeTo.params);
        // routeTo.params.bidDetail = res.data.data;
        next();
      });
      // .catch((error) => {
      //   if (error.response && error.response.status === 404) {
      //     next({ name: '404', params: { resource: 'event' } });
      //   } else {
      //     next({ name: 'NetworkIssue' });
      //   }
      // });
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiredAuth: true },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiredAuth: true },
  },
  {
    path: '/register-artist',
    name: 'RegisterArtist',
    component: () =>
      import(/* webpackChunkName: "RegArtist" */ '../views/dashboard/RegisterArtist.vue'),
    meta: { requiredAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = localStorage.getItem('user');
  // to.matched.some will return an array containing requiredAuth [false, true, false, ...]
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    // if requiredAuth is TRUE, check if user is logged in
    if (!isUserLoggedIn) {
      console.log('使用者未登入，請重新登入！');
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
