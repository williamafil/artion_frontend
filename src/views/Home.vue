<template>
  <div class="home">
    <!--  HERO begin  -->
    <div class="flex bg-white mb-4" style="height:600px;">
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
            <a
              class="px-4 py-3 bg-gray-900 text-gray-200 text-xs
              font-semibold rounded hover:bg-gray-800"
              href="#"
              >詳細資料</a
            >
            <a
              class="mx-4 px-4 py-3 bg-yellow-300 text-gray-900 text-xs
                font-semibold rounded hover:bg-yellow-400"
              href="#"
              >加入競標</a
            >
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
    <div class="my-10 flex justify-center">
      <section class="flex flex-col w-full">
        <div class="container my-3 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap">
            <!--  CARD  -->
            <AuctionCard v-for="item in auctions" :key="item.id" :item="item" />
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
import AuctionCard from '@/components/AuctionCard.vue';

export default {
  name: 'Home',
  components: { AuctionCard },
  created() {
    this.$store.dispatch('auction/getHeroAuction');
    this.$store.dispatch('auction/getAuctions');
  },
  computed: {
    ...mapState('auction', ['auctions', 'heroAuction']),
  },
};
</script>
