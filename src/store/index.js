import Vue from 'vue';
import Vuex from 'vuex';
import { apiService, userLogin, userSignup, userAvatar } from '@/service/api';

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
    CLEAR_USER_DATA(state) {
      state.user = null;
      localStorage.removeItem('user');
      apiService.defaults.headers.common.Authorization = null;
    },
    SET_USER_AVATAR(state, avatarURL) {
      state.user.avatar = avatarURL;
      const localStorageData = JSON.parse(localStorage.getItem('user'));
      localStorageData.avatar = avatarURL;
      localStorage.setItem('user', JSON.stringify(localStorageData));
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
    logout(context) {
      context.commit('CLEAR_USER_DATA');
    },
    uploadAvatar(context, formDataPayload) {
      console.log('uploadAvatar ACTION');
      console.log('context: ', context);
      console.log('formDataPayload: ', formDataPayload);
      return userAvatar(formDataPayload).then((res) => {
        console.log('userAvatar response: ', res.data.avatar);
        context.commit('SET_USER_AVATAR', res.data.avatar);
      });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    avatarUrl(state) {
      // let url =
      //   state.user.avatar === null
      //     ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
      //     : state.user.avatar;
      return state.user.avatar === null
        ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        : state.user.avatar;
    },
  },
  modules: {},
});
