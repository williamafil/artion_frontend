<template>
  <div class="my-5 px-1 w-full md:w-1/2 md:px-4 lg:my-4 lg:px-4 lg:w-1/3">
    <router-link :to="{ name: 'Auction', params: { id: item.slug } }">
      <div class="mt-2 shadow-xl">
        <article class="overflow-hidden shadow-lg">
          <div class="relative">
            <div v-if="isLoggedIn" class="absolute right-4 top-4">
              <Heart :auctionId="item.id" :userId="user.id" />
            </div>
            <div class="absolute bottom-4 w-full flex justify-center items-center">
              <div class="flex items-center justify-center h-16 w-32 bg-gray-100 rounded-l-lg">
                <div v-if="!isPassedStartTime" class="text-base font-semibold">即將開始</div>
                <div v-else>
                  <vac :end-time="item.end_time">
                    <template v-slot:process="{ timeObj }">
                      <h2 class="text-sm font-semibold">
                        {{ `${timeObj.d}d ${timeObj.h}h ${timeObj.m}m ${timeObj.s}` }}
                      </h2>
                    </template>
                    <template v-slot:finish>
                      <span>結束</span>
                    </template>
                  </vac>
                </div>
              </div>
              <div class="flex items-center justify-center h-16 w-40 bg-gray-200 rounded-r-lg">
                <div class="flex flex-col justify-start ">
                  <label class="leading-4 text-sm font-bold">起標價</label>
                  <h3 class="leading-4 text-lg font-extrabold">
                    {{ item.bidding_price | separator | dollar }}
                  </h3>
                </div>
              </div>
            </div>
            <img
              alt="Placeholder"
              class="block object-cover h-56 w-full rounded-t-md"
              :src="item.images_url[0]"
            />
          </div>
          <header class="flex flex-col items-center justify-between leading-tight p-2 md:p-4">
            <div class="w-full flex justify-between px-10 py-2">
              <h4 class="text-lg font-extrabold">
                <span class="block text-xs text-gray-500">作者</span>
                {{ item.author_name }}
              </h4>
              <h4 class="text-lg font-extrabold">
                <span class="block text-xs text-gray-500 text-right">{{ item.genre.name }}</span>
                {{ item.title }}
              </h4>
            </div>
            <div class="text-xl py-6 px-10">
              <img
                alt="quote"
                class="float-left mr-1"
                src="https://assets-global.website-files.com/5b5a66e9f3166b36708705fa/5cf8fb1f994fb7168d0d66fb_quote-intro.svg"
              />
              {{ item.description | truncate(60) }}
            </div>
          </header>
        </article>
      </div>
    </router-link>
  </div>
</template>

<script>
import { authComputed } from '@/store/helpers';
import { mapState } from 'vuex';
import Heart from '@/components/Follow.vue';

export default {
  components: {
    Heart,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...authComputed,
    ...mapState('user', ['user']),
    isPassedStartTime() {
      console.log('new Date(): ', new Date());
      console.log('大於');
      console.log('this.start_time: ', this.start_time);
      console.log('new Date(this.start_time: ', new Date(this.start_time));
      console.log('Date.parse(this.start_time): ', Date.parse(this.start_time));
      return new Date() > new Date(this.start_time);
    },
  },
};
</script>

<style lang="scss" scoped></style>
