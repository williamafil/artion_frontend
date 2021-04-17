import Vue from 'vue';
import Vuex from 'vuex';

// import * as user from '@/store/modules/user';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
