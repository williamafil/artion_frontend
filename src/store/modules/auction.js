import { fetchAuctions } from '@/service/api';

export default {
  namespaced: true,
  state: {
    auctions: [],
    auction: {},
  },
  mutations: {
    SET_AUCTIONS(state, auctionsPayload) {
      state.auctions = auctionsPayload;
    },
  },
  actions: {
    getAuctions(context) {
      return fetchAuctions().then((res) => {
        console.log('getAuctions response: ', res);
        context.commit('SET_AUCTIONS', res.data.data);
      });
    },
  },
  getters: {},
};
