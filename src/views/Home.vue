<template>
  <div class="home">
    <!--  HERO begin  -->
    <div v-if="heroAuction" class="flex bg-white mb-4" style="height:600px;">
      <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
        <div class=" mx-20">
          <h2 class="uppercase text-3xl font-semibold text-gray-800 md:text-4xl">
            {{ heroAuction.title }}
            <span class="capitalize text-indigo-600 text-base"
              >by {{ heroAuction.author_name }}</span
            >
          </h2>
          <p class="mt-2 text-sm text-gray-500 md:text-base">
            {{ heroAuction.description | truncate(110) }}
          </p>
          <h4 class="mt-14 text-lg font-bold">競標結束時間</h4>
          <vac :end-time="heroAuction.end_time">
            <template v-slot:process="{ timeObj }">
              <h2 class="text-5xl font-extrabold">
                {{ `${timeObj.d}:${timeObj.h}:${timeObj.m}:${timeObj.s}` }}
              </h2>
            </template>
            <template v-slot:finish>
              <span>Done!</span>
            </template>
          </vac>
          <div class="flex justify-center lg:justify-start mt-6">
            <div
              class="px-4 py-3 bg-gray-700 text-gray-200 text-xs
              font-semibold rounded hover:bg-gray-900 cursor-pointer"
              @click="follow"
            >
              關注此競標
            </div>
            <router-link
              :to="{ name:'Auction', params: {id: this.heroAuction.slug} }"
              class="mx-4 px-4 py-3 bg-yellow-300 text-gray-900 text-xs
                    font-semibold rounded hover:bg-yellow-400"
              >
                了解詳情
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="hidden lg:block lg:w-1/2"
        style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"
      >
        <div
          class="h-full object-cover"
          :style="{ backgroundImage: `url(${heroAuction.images_url[0]})` }"
        >
          <div class="h-full bg-black opacity-25"></div>
        </div>
      </div>
    </div>
    <!--  HERO end  -->

    <!--  CARDS begin  -->
    <div class="my-10 flex justify-center bg-gray-50">
      <section class="flex flex-col w-full">
        <!-- <hr class="bg-black h-0.5 w-3/4  mx-auto" /> -->
        <h2 class="mt-6 text-center text-5xl text-gray-700 font-extrabold ">即將開始</h2>
        <div class="container my-8 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap">
            <!--  CARD  -->
            <AuctionCard v-for="item in recentAuctions" :key="item.id" :item="item" />
            <!--  CARD  -->
          </div>
        </div>
      </section>
    </div>
    <!--  CARDS end  -->
    <br /><br /><br />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { authComputed } from '@/store/helpers';
import AuctionCard from '@/components/AuctionCard.vue';
import { fetchHeroAuction, recentAuctions, createLike } from '@/service/api';

export default {
  name: 'Home',
  components: { AuctionCard },
  data() {
    return {
      heroAuction: null,
      recentAuctions: null,
    };
  },
  created() {
    // this.$store.dispatch('auction/getHeroAuction');
    fetchHeroAuction()
      .then((res) => {
        console.log('hero auction response: ', res);
        this.heroAuction = res.data.data;
        // context.commit('SET_HERO_AUCTION', res.data.data);
      })
      .catch((error) => {
        console.log('錯誤: ', error);
        const notification = {
          type: 'ERROR',
          message: `無法取得首頁抬頭拍賣資料: ${error.message}`,
        };
        this.$store.dispatch('notification/add_notification', notification, { root: true });
      });

    recentAuctions()
      .then((res) => {
        console.log('hero auction response: ', res);
        this.recentAuctions = res.data.data;
        // context.commit('SET_HERO_AUCTION', res.data.data);
      })
      .catch((error) => {
        console.log('錯誤: ', error);
        const notification = {
          type: 'ERROR',
          message: `無法取得首頁抬頭拍賣資料: ${error.message}`,
        };
        this.$store.dispatch('notification/add_notification', notification, { root: true });
      });

    this.$store.dispatch('auction/getAuctions');
  },
  methods: {
    follow() {
      console.log('follow');
      if (!this.isLoggedIn) {
        const notification = {
          type: 'ERROR',
          message: '欲關注此競標，請先登入！',
        };
        this.$store.dispatch('notification/add_notification', notification);
      } else {
        console.log('我的user id: ', this.user.id);
        console.log('this.heroAuction.id: ', this.heroAuction.id);

        createLike({ user_id: this.user.id, auction_id: this.heroAuction.id }).then((res) => {
          if (res.status === 200) {
            const notification = {
              type: 'SUCCESS',
              message: '關注成功！',
            };
            this.$store.dispatch('notification/add_notification', notification);
          }
        });
      }
    },
  },
  computed: {
    ...mapState('auction', ['auctions']),
    ...mapState('user', ['user']),
    ...authComputed,
  },
};
</script>
