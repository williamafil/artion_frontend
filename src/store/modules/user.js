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
      // console.log('userData: ', userData);
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
      return userSignup({ user: credentialPayload })
        .then((res) => {
          console.log('註冊後res: ', res);
          const responseData = {
            ...res.data,
            token: res.headers.authorization,
          };
          context.commit('SET_USER_DATA', responseData);

          const notification = {
            type: 'SUCCESS',
            message: '註冊成功！',
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        })
        .catch((error) => {
          const notification = {
            type: 'ERROR',
            message: `註冊失敗: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        });
    },
    logout(context) {
      context.commit('CLEAR_USER_DATA');
    },
    uploadAvatar(context, formDataPayload) {
      return userAvatar(formDataPayload)
        .then((res) => {
          context.commit('SET_USER_AVATAR', res.data.avatar);
          const notification = {
            type: 'SUCCESS',
            message: '成功上傳頭像！',
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        })
        .catch((error) => {
          const notification = {
            type: 'ERROR',
            message: `頭像上傳失敗: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        });
    },
    updateNameField(context, objPayload) {
      return userUpdateName(context.state.user.id, objPayload)
        .then((res) => {
          if (res.status === 200) {
            context.commit('SET_USER_NAME', res.data.data.name);
            const notification = {
              type: 'SUCCESS',
              message: '使用者名稱更新成功！',
            };
            context.dispatch('notification/add_notification', notification, { root: true });
          } else {
            throw new Error('使用者名稱更新失敗');
          }
        })
        .catch((error) => {
          const notification = {
            type: 'ERROR',
            message: `使用者名稱更新失敗: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        });
    },
    registerAsArtist(context, objPayload) {
      // console.log('objPayload regArtist: ', objPayload);

      return userRegArtist(context.state.user.id, objPayload)
        .then((res) => {
          // console.log('register as artist response: ', res);
          const notification = {
            type: 'SUCCESS',
            message: '成功註冊為藝術家！',
          };
          context.dispatch('notification/add_notification', notification, { root: true });

          context.commit('UPDATE_USER_AS_ARTIST');
          return res;
        })
        .catch((error) => {
          const notification = {
            type: 'ERROR',
            message: `註冊為藝術家失敗: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        });
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    isArtist(state) {
      return state.user.is_artist;
    },
    userName(state) {
      return state.user.name;
    },
  },
};
