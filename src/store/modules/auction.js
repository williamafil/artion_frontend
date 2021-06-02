import {
  apiService,
  fetchAuctions,
  recentAuctions,
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
    getAuctions(context) {
      fetchAuctions()
        .then((res) => {
          // console.log('getAuctions response: ', res);
          context.commit('SET_AUCTIONS', res.data.data);
        })
        .catch((error) => {
          // console.log('錯誤: ', error);
          const notification = {
            type: 'ERROR',
            message: `無法取得所有拍賣資料: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
        });
    },
    getRecentAuctions(context) {
      recentAuctions()
        .then((res) => {
          // console.log('getAuctions response: ', res);
          context.commit('SET_AUCTIONS', res.data.data);
        })
        .catch((error) => {
          // console.log('錯誤: ', error);
          const notification = {
            type: 'ERROR',
            message: `無法取得即將開始的拍賣: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
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
        if (res.data.data.bid_details !== 0) {
          context.commit('SET_BID_DETAIL', res.data.data.bid_details);
        } else {
          context.commit('SET_BID_DETAIL', []);
        }
      });
    },
    createBid(context, objPayload) {
      return createBid(objPayload)
        .then((res) => {
          console.log('成功下標後的res：', res);
          if (res.data.status === 'FAIL') {
            return {
              type: 'ERROR',
              message: res.data.message,
            };
          }
          // console.log('createBid response: ', res);
          // const notification = {
          //   type: 'SUCCESS',
          //   message: '競標出價成功！',
          // };
          // context.dispatch('notification/add_notification', notification, { root: true });
          // context.commit('ADD_BID_DETAIL', res.data.data);
          return {
            type: 'SUCCESS',
            message: res.data.message,
          };
        })
        .catch((error) => {
          // console.log('錯誤: ', error);
          // console.log('錯誤response: ', error.response);
          // console.dir('錯誤status: ', error);
          const notification = {
            type: 'ERROR',
            message:
              error.response.status === 401
                ? `競標出價失敗: ${error.response.data.error}，請重新登入。`
                : `錯誤 ${error.response.statusText} -  ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
          context.dispatch('user/logout');
          throw error;
        });
    },
    receiveMessage(context, data) {
      context.commit('ADD_BID_DETAIL', data);
    },
    createAuction(context, formData) {
      console.log(apiService);
      // apiService.defaults.headers.common['Content-Type'] = 'multipart/form-data';

      return newAuc(formData)
        .then((res) => {
          // console.log('artist create auction: ', res);
          const notification = {
            type: 'SUCCESS',
            message: '新的拍賣建立成功！',
          };
          context.dispatch('notification/add_notification', notification, { root: true });
          return { slug: res.data.data.slug };
        })
        .catch((error) => {
          // console.log('錯誤: ', error);
          const notification = {
            type: 'ERROR',
            message: `新建拍賣失敗: ${error.message}`,
          };
          context.dispatch('notification/add_notification', notification, { root: true });
          throw error;
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
