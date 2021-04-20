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
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
