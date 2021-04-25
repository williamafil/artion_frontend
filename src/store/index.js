import Vue from 'vue';
import Vuex from 'vuex';

// import * as user from '@/store/modules/user';
import user from '@/store/modules/user';
import auction from '@/store/modules/auction';
import { fetchGenreList } from '@/service/api';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auction,
  },
  state: {
    genres: [],
  },
  mutations: {
    SET_GENRE_LIST(state, genrePayload) {
      state.genres = genrePayload;
    },
  },
  actions: {
    getGenreList(context) {
      return fetchGenreList().then((res) => {
        context.commit('SET_GENRE_LIST', res.data.data);
      });
    },
  },
  getters: {},
});
