import Vue from 'vue';
import axios from 'axios';
import { dollarSign, thousandSeparator } from '@/filters/dollar';
import dateFilter from '@/filters/date';
import stringTruncate from '@/filters/truncate';
import avatarFilter from '@/filters/avatar';
import ActionCable from 'actioncable';
import Vuelidate from 'vuelidate';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import VueAgile from 'vue-agile';
import 'nprogress/nprogress.css';

import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';

Vue.use(vueAwesomeCountdown, 'vac'); // Component name, `countdown` and `vac` by default
Vue.use(Vuelidate);
Vue.use(VueAgile);

const cable = ActionCable.createConsumer(process.env.VUE_APP_WEBSOCKET_URL);
// const cable = ActionCable.createConsumer('wss://artion.balliiballii.com/cable');
Vue.prototype.$cable = cable;

Vue.config.productionTip = false;

Vue.filter('dollar', dollarSign);
Vue.filter('separator', thousandSeparator);
Vue.filter('date', dateFilter);
Vue.filter('avatar', avatarFilter);
Vue.filter('truncate', stringTruncate);

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit('user/SET_USER_DATA', userData);
    }

    // AXIOS 攔截器
    axios.interceptors.response.use((response) => response,
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log('axios interceptors 錯誤');
        if (error.response.status === 401) {
          this.$store.dispatch('user/logout');
        }

        return Promise.reject(error);
      });
  },
  render: (h) => h(App),
}).$mount('#app');
