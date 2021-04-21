<template>
  <div>
    <div
      class="w-full bg-cover bg-center relative"
      style="height:32rem;
            background-image: url(https://images.unsplash.com/photo-1572450732467-5eb1311e7bc8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2534&q=80);"
    >
      <div class="flex items-center justify-center w-full">
        <article class="absolute w-4/6 px-10  -bottom-20 flex justify-center items-center">
          <div
            class="flex flex-col items-end justify-center h-36 w-3/6 bg-gray-200 rounded-l-lg px-10"
          >
            <h3 class="text-3xl font-extrabold">$ 1,420,000</h3>
            <label class="font-bold text-sm">目前競標價格</label>
          </div>

          <div
            class="flex flex-col items-start justify-center h-36 w-3/6 bg-gray-100 rounded-r-lg px-10"
          >
            <h3 class="text-3xl font-extrabold">2d 23h 57m</h3>
            <label class="font-bold text-sm">競標結束時間</label>
          </div>
        </article>
      </div>
    </div>

    <div
      class="relative container mt-40 mb-2 flex flex-col mx-auto w-full items-center justify-center"
    >
      <div class="w-4/6 px-10 mb-10 -bottom-20 flex justify-between items-center">
        <h3 class="text-3xl font-extrabold">{{ auction.user.name }}</h3>
        <h3 class="text-3xl font-extrabold">{{ auction.title }}</h3>
      </div>

      <TabNav :tabs="['競標資訊', '藝術品詳情']" :selected="selected" @selected="setSelected">
        <Tab :isSelected="selected === '競標資訊'">
          <!-- 第一個 tab -->

          <div v-if="!isLoggedIn" class="my-10 ml-2">
            請
            <router-link :to="{ name: 'Login' }" class="mx-2 p-2 border rounded-sm"
              >登入</router-link
            >
            或
            <router-link :to="{ name: 'Register' }" class="mx-2 p-2 border rounded-sm"
              >註冊</router-link
            >
            來進行競標或查看目前競標狀態！
          </div>
          <div v-else>
            <ul class="flex w-full flex-col p-4">
              <li
                v-for="(bid, index) in bidDetail"
                :key="index"
                class="border-gray-400 flex flex-row mb-2"
              >
                <div
                  class="select-none flex flex-1 items-center p-4 transition
                        duration-300 ease-in-out transform hover:-translate-y-1
                        border-dashed border-b-2 border-light-blue-500 p-6 hover:shadow-lg"
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
                    class="w-1/4 text-wrap text-center flex text-yellow-500 text-bold
                          flex-col rounded-md bg-white border-2 border-yellow-400 justify-center items-center p-2"
                  >
                    {{ bid.bid | separator | dollar }}
                  </div>
                </div>
              </li>
            </ul>

            <button
              type="button"
              @click="toggleModal = !toggleModal"
              class="z-100 w-full bg-yellow-400 p-2 rounded-md mt-6 mb-4 hover:bg-yellow-300 outline-none
                active:outline-none focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-opacity-50"
            >
              我要下標
            </button>
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
        <div class="bg-yellow-300 h-60 w-full px-8 py-10">
          <form @submit.prevent="submitBid">
            <input v-model.number="bidPrice" />
            <button type="submit">出價</button>
          </form>
          <button
            @click="toggleModal = false"
            class="absolute top-2 right-2 rounded-full border-2 text-gray-300 bg-white text-white w-8 h-8"
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
  async created() {
    this.bidChannel = this.$cable.subscriptions.create('BidChannel', {
      received: (data) => {
        // this.messages.push(data);
        console.log('接收 websocket資料：', data.message);
        this.$store.dispatch('auction/receiveMessage', data.message);
      },
    });

    console.log('this.getCurrentBid: ', this.getCurrentBid);
    // this.bidPrice = this.getCurrentBid;
    console.log('Number(this.getCurrentBid): ', Number(this.getCurrentBid));
    console.log('Number(this.auction.interval: ', Number(this.auction.interval));
    this.bidPrice = Number(this.getCurrentBid);
    // this.bidPrice = Number(this.getCurrentBid) + Number(this.auction.interval);
    // console.log('使用者登入狀態：', this.isLoggedIn);
    await this.$store.dispatch('auction/getAuction', this.id);
    if (this.isLoggedIn) {
      await this.$store.dispatch('auction/getBidDetail', this.id);
    }
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
          this.bidChannel.perform('speak', {
            message: response,
          });
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
    ...mapState('auction', ['auction', 'bidDetail']),
    ...mapState('user', ['user']),
    // ...mapState(['auction']),
    ...mapGetters('auction', ['getCurrentBid']),
    ...authComputed,
  },
};
</script>

<style lang="scss" scoped></style>
