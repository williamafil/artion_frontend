import Vue from 'vue';
import Vuex from 'vuex';
import { apiService, userLogin } from '@/service/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      apiService.defaults.headers.common.Authorization = userData.token;
    },
  },
  actions: {
    login(context, credentialPayload) {
      return userLogin({ user: credentialPayload }).then((res) => {
        console.log('userLogin response: ', res);
        const responseData = {
          ...res.data.data,
          token: res.headers.authorization,
        };
        context.commit('SET_USER_DATA', responseData);
      });
    },
  },
  modules: {},
});
