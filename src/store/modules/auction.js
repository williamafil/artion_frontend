import { fetchAuctions, fetchAuction, fetchBidDetail, createBid } from '@/service/api';

export default {
  namespaced: true,
  state: {
    auctions: [],
    auction: {},
    bidDetail: [],
  },
  mutations: {
    SET_AUCTIONS(state, auctionsPayload) {
      state.auctions = auctionsPayload;
    },
    SET_AUCTION(state, auctionPayload) {
      state.auction = { ...auctionPayload };
    },
    SET_BID_DETAIL(state, bidDetailPayload) {
      state.bidDetail = bidDetailPayload;
    },
    ADD_BID_DETAIL(state, bidDetailPayload) {
      state.bidDetail.push(bidDetailPayload);
    },
  },
  actions: {
    getAuctions(context) {
      return fetchAuctions().then((res) => {
        console.log('getAuctions response: ', res);
        context.commit('SET_AUCTIONS', res.data.data);
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
        context.commit('SET_BID_DETAIL', res.data.data.bid_details);
      });
    },
    createBid(context, objPayload) {
      return createBid(objPayload).then((res) => {
        console.log('createBid response: ', res);
        context.commit('ADD_BID_DETAIL', res.data.data);
      });
    },
  },
  getters: {
    getAuctionBySlugId: (state) => (slug) => {
      const result = state.auctions.find((auction) => auction.slug === slug);
      return result;
    },
    getCurrentBid: (state) => state.bidDetail[state.bidDetail.length - 1].bid,
  },
};