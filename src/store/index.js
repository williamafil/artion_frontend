import Vue from 'vue';
import Vuex from 'vuex';
import { apiService, userLogin, userSignup } from '@/service/api';

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
    signup(context, credentialPayload) {
      console.log('signup credentialPayload: ', credentialPayload);
      return userSignup({ user: credentialPayload }).then((res) => {
        console.log('userSignup response: ', res);
        console.log('userData: ', res.data);
        console.log('token: ', res.headers.authorization);
        const responseData = {
          ...res.data,
          token: res.headers.authorization,
        };
        context.commit('SET_USER_DATA', responseData);
      });
    },
  },
  modules: {},
});
