<template>
  <div>
    <div
      class="w-full bg-cover bg-center relative"
      style="height:32rem;"
      :style="{ 'background-image': 'url(' + auction.images_url[randomBgImage] + ')' }"
    >
      <div class="flex items-center justify-center w-full">
        <article class="absolute w-4/6 px-10  -bottom-20 flex justify-center items-center">
          <div
            class="flex flex-col justify-center items-end h-36 w-3/6 bg-gray-200 rounded-l-lg px-10"
          >
            <div v-if="isAnyBid" class="flex flex-col justify-center items-end">
              <h3 class="text-3xl font-extrabold">{{ currentHighestBid | separator | dollar }}</h3>
              <label class="font-bold text-sm">目前競標價格</label>
            </div>
            <div v-else  class="flex flex-col justify-center items-end">
              <h3 class="text-3xl font-extrabold">{{ auction.bidding_price | separator | dollar }}</h3>
              <label class="font-bold text-sm">此拍賣起標價</label>
            </div>
          </div>

          <div
            class="flex flex-col items-start justify-center h-36 w-3/6 bg-gray-100 rounded-r-lg px-10"
          >
            <h3 class="text-3xl font-extrabold">
              <div v-if="!isPassedStartTime">
                競標時間未開始
              </div>
              <div v-else>
                <vac :end-time="auction.end_time">
                  <template v-slot:process="{ timeObj }">
                    <h2 class="text-3xl font-extrabold">
                      {{ `${timeObj.d}d ${timeObj.h}h ${timeObj.m}m ${timeObj.s}` }}
                    </h2>
                  </template>
                  <template v-slot:finish>
                    <span>結束</span>
                  </template>
                </vac>
              </div>
            </h3>
            <label v-if="isPassedStartTime" class="font-bold text-sm">競標結束時間</label>
          </div>
        </article>
      </div>
    </div>

    <div
      class="relative container mt-40 mb-2 flex flex-col mx-auto w-full items-center justify-center"
    >
      <div class="w-4/6 px-10 mb-10 -bottom-20 flex justify-between items-center">
        <h3 class="text-3xl font-extrabold">{{ auction.author_name }}</h3>
        <h3 class="text-3xl font-extrabold">{{ auction.title }}</h3>
      </div>

      <TabNav :tabs="['競標資訊', '藝術品詳情']" :selected="selected" @selected="setSelected">
        <Tab :isSelected="selected === '競標資訊'">
          <!-- 第一個 tab -->
          <div v-if="!isLoggedIn" class="my-10 ml-2">
            請
            <router-link :to="{ name: 'Login' }" class="mx-2 p-2 border rounded-sm hover:bg-yellow-200"
              >登入</router-link
            >
            或
            <router-link :to="{ name: 'Register' }" class="mx-2 p-2 border rounded-sm hover:bg-yellow-200"
              >註冊</router-link
            >
            來進行競標或查看目前競標狀態！
          </div>
          <div v-else>
            <div v-if="bidDetail.length === 0" class="text-center mt-4">目前沒有人參與競標</div>
            <ul v-else class="flex w-full flex-col p-4">
              <li
                v-for="(bid, index) in bidDetail"
                :key="index"
                class="border-gray-400 flex flex-row mb-2"
              >
                <div
                  class="select-none flex flex-1 items-center p-4 transition
                        duration-300 ease-in-out transform hover:-translate-y-1
                        border-b border-b-1 border-light-blue-500 p-6 hover:shadow-lg"
                >
                  <div class="flex flex-col justify-center items-center mr-4">
                    <img
                      class="h-8 w-8 rounded-full object-cover"
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col justify-center items-start mr-4">
                    <h3 class="text-lg font-bold">名稱：{{ bid.user.name }}</h3>
                    <p class="text-sm">{{ bid.created_at | date }}</p>
                    <!-- <p class="text-sm">02h 01m 前下標</p> -->
                  </div>

                  <div class="flex-1 flex-col justify-start self-start pl-1 mr-16">
                    <div class="font-medium"></div>
                  </div>
                  <div
                    class="w-2/5 text-wrap text-center flex text-xs md:text-lg text-yellow-500 text-bold
                          flex-col rounded-md bg-white border-2 border-yellow-400 justify-center items-center p-2"
                  >
                    {{ bid.bid | separator | dollar }}
                  </div>
                </div>
              </li>
            </ul>

            <div v-if="isWithinTime && auction.is_active">
              <button
                type="button"
                @click="toggleModal = !toggleModal"
                class="z-100 w-full bg-yellow-400 p-2 rounded-md mt-6 mb-4 hover:bg-yellow-300 outline-none
                  active:outline-none focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-opacity-50"
              >
                我要下標
              </button>
            </div>

            <!-- {{ new Date()}}
            <br/>
            {{ auction.start_time }}
            <br/>
            {{new Date(auction.start_time)}}
            <br/><br/>
            {{ new Date() > new Date(auction.start_time) }}
            <br/>
            isPassedStartTime: {{isPassedStartTime}}
            <br />
            isWithinTime: {{isWithinTime}} -->

            <!--
              isPassedStartTime: false && isActive: false
              isPassedStartTime: false && isActive: true
              isPassedStartTime: true && isActive: false
              isPassedStartTime: true && is&& isActive: true -> 可以看到按鈕

             -->
          </div>

        </Tab>
        <Tab :isSelected="selected === '藝術品詳情'">
          <!-- 第二個 tab -->
          <div class="container mx-auto px-4 sm:px-8">
            <h3 class="text-lg font-extrabold">作品介紹</h3>
            <p>{{ auction.description }}</p>
          </div>
        </Tab>
      </TabNav>
    </div>

    <!--  MODAL  -->
    <!-- <article v-show="toggleModal" class="absolute top-0 left-0 min-h-full w-full inset-0 bg-black opacity-60">
        <div class="fixed overflow-x-hidden overflow-y-hidden inset-0"></div>
      </article> -->

    <div
      v-if="toggleModal"
      class="fixed overflow-x-hidden overflow-y-hidden inset-0 flex justify-center items-center z-50"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-yellow-300 h-52 w-full px-8 py-10 border-2 border-gray-50 rounded-md">
          <form @submit.prevent="submitBid">
            <input
              type="number"
              class="my-4 w-full h-14 bg-gray-200 text-2xl rounded p-2"
              v-model.number="bidPrice"
            />
            <div
              v-if="isCreator"
              class="text-center text-red-500 text-sm"
            >
              拍賣建立者無法投標
            </div>
            <button
              v-else
              type="submit"
              class="w-full h-10 bg-white rounded cursor-pointer font-semibhold tracking-wider hover:bg-gray-100"
            >
              投標送出
            </button>
          </form>

          <button
            @click="toggleModal = false"
            class="absolute top-2 right-2 rounded-full border-2 text-gray-300 bg-white text-white w-6 h-6 flex justify-center items-center"
          >
            Ｘ
          </button>
        </div>
      </div>
    </div>
    <div v-if="toggleModal" class="absolute top-0 h-2000px inset-0 z-40 opacity-50 bg-black"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { authComputed } from '@/store/helpers';
import TabNav from '@/components/TabNav.vue';
import Tab from '@/components/Tab.vue';

export default {
  name: 'Auction',
  components: { TabNav, Tab },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      toggleModal: false,
      selected: '競標資訊',
      bidPrice: 0,
    };
  },
  created() {
    this.$store.dispatch('auction/getAuction', this.id);

    // this.bidChannel = this.$cable.subscriptions.create('BidChannel', {
    //   received: (data) => {
    //     // this.messages.push(data);
    //     console.log('接收 websocket資料：', data.message);
    //     this.$store.dispatch('auction/receiveMessage', data.message);
    //   },
    // });

    console.log('使用者登入狀態：', this.isLoggedIn);
    if (this.isLoggedIn) {
      console.log('使用者有登入');
      console.log('this.id: ', this.id);
      console.log('this.auction.id: ', this.auction.id);
      console.log('$store auction id', this.$store.state.auction.auction.id);

      this.bidChannel = this.$cable.subscriptions.create({
        channel: 'BidChannel',
        // auction: this.auction.id,
        auction_id: this.auction.id,
      }, {
        received: (data) => {
          // this.messages.push(data);
          console.log('接收 websocket資料：', data.message);
          this.$store.dispatch('auction/receiveMessage', data.message);
        },
      });

      this.$store
        .dispatch('auction/getBidDetail', this.id)
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          if (error.response.status === 401) {
            const notification = {
              type: 'ERROR',
              message: '請重新登入！',
            };
            this.$store.dispatch('notification/add_notification', notification);

            this.$store.dispatch('user/logout');
            this.$router.push({ name: 'Login' });
          }
        });

      // this.bidChannel = this.$cable.subscriptions.create('BidChannel', {
      //   received: (data) => {
      //     // this.messages.push(data);
      //     console.log('接收 websocket資料：', data.message);
      //     this.$store.dispatch('auction/receiveMessage', data.message);
      //   },
      // });
    }

    // this.bidPrice = this.getCurrentBid;
    // console.log('Number(this.getCurrentBid): ', Number(this.getCurrentBid));
    // console.log('Number(this.auction.interval: ', Number(this.auction.interval));
    // this.bidPrice = Number(this.getCurrentBid);
    // this.bidPrice = Number(this.getCurrentBid) + Number(this.auction.interval);
    // console.log('使用者登入狀態：', this.isLoggedIn);

    // if (Object.entries(this.auction).length === 0) {

    // }

    // if (this.isLoggedIn) {
    //   await this.$store.dispatch('auction/getBidDetail', this.id);
    // }
  },
  methods: {
    setSelected(tab) {
      console.log('setSelected event listener: ', tab);
      this.selected = tab;
    },
    submitBid() {
      this.$store
        .dispatch('auction/createBid', {
          bid: this.bidPrice,
          auction_id: this.auction.id,
          user_id: this.user.id,
        })
        .then((response) => {
          if (response.type === 'FAIL') {
            console.log('createBid response type = FAIL');
            this.$store.dispatch('notification/add_notification', response);
          } else {
            console.log('response 成功 開始 broadcast');
            this.$store.dispatch('notification/add_notification', response);
            this.bidChannel.perform('speak', {
              message: response,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$store.dispatch('user/logout');
            this.$router.push({ name: 'Login' });
          }
        });

      this.toggleModal = false;
    },
  },
  computed: {
    // bid: {
    //   get() {
    //     return this.$store.state.bidDetail[this.$store.state.bidDetail.length - 1].bid
    //   },
    // },
    randomBgImage() {
      const maxNum = this.auction.images_url.length;
      return Math.floor(Math.random() * maxNum);
    },
    isCreator() {
      const auctionCreator = this.auction.user_id;
      const myUserId = this.user.id;
      console.log('auctionCreator: ', this.auction.user_id);
      console.log('myUserId: ', this.user.id);
      console.log('等於：', this.auction.user_id === this.user.id);
      return myUserId === auctionCreator;
    },
    isAnyBid() {
      return !!this.bidDetail.length;
    },
    currentHighestBid() {
      return this.bidDetail.slice(-1)[0].bid;
    },
    isPassedStartTime() {
      return new Date() > new Date(this.auction.start_time);
    },
    isWithinTime() {
      return (new Date() > new Date(this.auction.start_time) && new Date() < new Date(this.auction.end_time));
    },
    ...mapState('auction', ['auction', 'bidDetail']),
    ...mapState('user', ['user']),
    // ...mapState(['auction']),
    ...mapGetters('auction', ['getBidDetailLength']),
    ...authComputed,
  },
};
</script>

<style lang="scss" scoped></style>
