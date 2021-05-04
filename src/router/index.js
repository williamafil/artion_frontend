/* eslint implicit-arrow-linebreak: ["error", "beside"] */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// import { authComputed } from '@/store/helpers';
import Home from '../views/Home.vue';
import Exhibition from '../views/Exhibition.vue';
import ArtistList from '../views/ArtistList.vue';
import Artist from '../views/Artist.vue';
import AuctionList from '../views/AuctionList.vue';
import Auction from '../views/Auction.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import NotFound from '../views/NotFound.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import DashHome from '../views/dashboard/DashHome.vue';
import RegArt from '../views/dashboard/RegArt.vue';
import UserProfile from '../views/dashboard/UserProfile.vue';
import Sell from '../views/dashboard/Sell.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auctions',
    name: 'AuctionList',
    component: AuctionList,
  },
  {
    path: '/auctions/:id',
    name: 'Auction',
    component: Auction,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      // console.log('user state: ', !!store.state.user.user);
      // console.log('routeTo.params.id: ', routeTo.params.id);
      if (store.state.user.user) {
        store
          .dispatch('auction/getAuction', routeTo.params.id)
          .then(() => {
            next();
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              next({ name: '404', params: { resource: 'event' } });
            } else {
              next({ name: 'NetworkIssue' });
            }
          });

        // store.dispatch('auction/getBidDetail', routeTo.params.id).then(() => {
        // console.log('route response: ', res);
        // console.log('routeTo.params: ', routeTo.params);
        // routeTo.params.bidDetail = res.data.data;
        // next();
        // });
      }
      next();

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
    path: '/artists',
    name: 'ArtistList',
    component: ArtistList,
  },
  {
    path: '/artists/:id',
    name: 'Artist',
    component: Artist,
    props: true,
  },
  {
    path: '/exhibitions',
    name: 'Exhibition',
    component: Exhibition,
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
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
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
    component: Dashboard,
    meta: { requiredAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashHome,
        meta: { requiredAuth: true },
      },
      {
        path: '/follows',
        name: 'Follows',
        component: () => import(/* webpackChunkName: "Follows" */ '../views/dashboard/Follows.vue'),
        meta: { requiredAuth: true },
      },
      {
        path: '/bids',
        name: 'Bids',
        component: () => import(/* webpackChunkName: "Bids" */ '../views/dashboard/Bids.vue'),
        meta: { requiredAuth: true },
      },
      {
        path: '/my-auctions',
        name: 'ArtistAuction',
        component: () => import(/* webpackChunkName: "Aucs" */ '../views/dashboard/Aucs.vue'),
        meta: { requiredAuth: true },
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiredAuth: true },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "Order" */ '../views/dashboard/Order.vue'),
        meta: { requiredAuth: true },
      },
      {
        path: 'register-artist',
        name: 'RegisterArtist',
        component: RegArt,
        meta: { requiredAuth: true },
      },
      {
        path: 'sell',
        name: 'Sell',
        component: Sell,
        meta: { requiredAuth: true },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: { name: '404' },
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
      const notification = {
        type: 'ERROR',
        message: '使用者未登入，請重新登入！',
      };
      store.dispatch('notification/add_notification', notification);
      store.dispatch('user/logout');
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
