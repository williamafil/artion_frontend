import {
  apiService,
  fetchAuctions,
  fetchHeroAuction,
  fetchAuction,
  fetchBidDetail,
  createBid,
  newAuc,
} from '@/service/api';

export default {
  namespaced: true,
  state: {
    auctions: [],
    heroAuction: {},
    auction: {},
    bidDetail: [],
  },
  mutations: {
    SET_AUCTIONS(state, auctionsPayload) {
      state.auctions = auctionsPayload;
    },
    SET_HERO_AUCTION(state, auctionPayload) {
      state.heroAuction = auctionPayload;
    },
    SET_AUCTION(state, auctionPayload) {
      state.auction = auctionPayload;
    },
    SET_BID_DETAIL(state, bidDetailPayload) {
      state.bidDetail = bidDetailPayload;
    },
    ADD_BID_DETAIL(state, bidDetailPayload) {
      // state.bidDetail.push(bidDetailPayload);
      const newArr = [...state.bidDetail, bidDetailPayload];
      state.bidDetail = newArr;
    },
  },
  actions: {
    async getAuctions(context) {
      await fetchAuctions().then((res) => {
        console.log('getAuctions response: ', res);
        context.commit('SET_AUCTIONS', res.data.data);
      });
    },
    async getHeroAuction(context) {
      await fetchHeroAuction().then((res) => {
        console.log('hero auction response: ', res);
        context.commit('SET_HERO_AUCTION', res.data.data);
      });
    },
    getAuction(context, slug) {
      const auction = context.getters.getAuctionBySlugId(slug);
      if (auction) {
        context.commit('SET_AUCTION', auction);
      }
      return fetchAuction(slug).then((res) => {
        context.commit('SET_AUCTION', res.data.data);
      });
    },
    getBidDetail(context, slug) {
      return fetchBidDetail(slug).then((res) => {
        console.log('fetchBidDetail response: ', res);
        console.log('context');
        if (res.data.data.bid_details !== 0) {
          context.commit('SET_BID_DETAIL', res.data.data.bid_details);
        } else {
          context.commit('SET_BID_DETAIL', []);
        }
      });
    },
    createBid(context, objPayload) {
      return createBid(objPayload).then((res) => {
        console.log('createBid response: ', res);
        // context.commit('ADD_BID_DETAIL', res.data.data);
      });
    },
    receiveMessage(context, data) {
      context.commit('ADD_BID_DETAIL', data);
    },
    createAuction(context, formData) {
      console.log(apiService);
      // apiService.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      return newAuc(formData).then((res) => {
        console.log('artist create auction: ', res);
      });
    },
  },
  getters: {
    getAuctionBySlugId: (state) => (slug) => {
      const result = state.auctions.find((auction) => auction.slug === slug);
      return result;
    },
    getCurrentBid: (state) => {
      if (state.bidDetail.length !== 0) {
        return state.bidDetail[state.bidDetail.length - 1].bid;
      }
      return state.auction.bidding_price;
    },
    getBidDetailLength: (state) => state.bidDetail.length,
  },
};
