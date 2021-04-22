/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import {
  apiService,
  userLogin,
  userSignup,
  userAvatar,
  userUpdateName,
  userRegArtist,
} from '@/service/api';

export default {
  namespaced: true,
  state: {
    user: null,
  },

  mutations: {
    SET_USER_DATA(state, userData) {
      console.log('userData: ', userData);
      state.user = { ...userData };
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
    SET_USER_NAME(state, name) {
      state.user.name = name;
      const localStorageData = JSON.parse(localStorage.getItem('user'));
      localStorageData.name = name;
      localStorage.setItem('user', JSON.stringify(localStorageData));
    },
    UPDATE_USER_AS_ARTIST(state) {
      state.user = {
        ...state.user,
        is_artist: true,
      };
      const localStorageData = JSON.parse(localStorage.getItem('user'));
      localStorageData.is_artist = true;
      localStorage.setItem('user', JSON.stringify(localStorageData));
    },
  },

  actions: {
    login(context, credentialPayload) {
      return userLogin({ user: credentialPayload }).then((res) => {
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
      return userAvatar(formDataPayload).then((res) => {
        context.commit('SET_USER_AVATAR', res.data.avatar);
      });
    },
    updateNameField(context, objPayload) {
      return userUpdateName(context.state.user.id, objPayload).then((res) => {
        context.commit('SET_USER_NAME', res.data.data.name);
      });
    },
    registerAsArtist(context, objPayload) {
      console.log('objPayload regArtist: ', objPayload);
      return userRegArtist(context.state.user.id, objPayload).then((res) => {
        console.log('register as artist response: ', res);
        context.commit('UPDATE_USER_AS_ARTIST');
      });
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    isArtist(state) {
      return !!state.user.is_artist;
    },
    // avatarUrl(state) {
    //   console.log('State: ', state.user.user);
    //   return state.user.avatar === null
    //     ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    //     : state.user.avatar;
    // },
    userName(state) {
      return state.user.name;
    },
    // userId(state) {
    //   return state.user.id;
    // },
  },
};
