import Vue from 'vue';
import Vuex from 'vuex';

// import * as user from '@/store/modules/user';
import user from '@/store/modules/user';
import auction from '@/store/modules/auction';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auction,
  },
  state: {
    // genres: [],
    // artists: [],
    // priceRange: [],
  },
  mutations: {
    // SET_GENRE_LIST(state, genrePayload) {
    //   state.genres = genrePayload;
    // },
    // SET_ARTIST_LIST(state, artistPayload) {
    //   state.artists = artistPayload;
    // },
    // SET_PRICE_RANGE(state, rangePayload) {
    //   state.priceRange = rangePayload;
    // },
  },
  actions: {
    // getGenreList(context) {
    //   return fetchGenreList().then((res) => {
    //     context.commit('SET_GENRE_LIST', res.data.data);
    //   });
    // },
    // getArtistList(context) {
    //   return fetchArtistList().then((res) => {
    //     console.log('get artist list: ', res.data.data);
    //     context.commit('SET_ARTIST_LIST', res.data.data);
    //   });
    // },
    // getPriceRange(context) {
    //   return fetchPriceRange().then((res) => {
    //     console.log('get artist list: ', res.data.data);
    //     context.commit('SET_PRICE_RANGE', res.data.data);
    //   });
    // },
  },
  getters: {},
});
