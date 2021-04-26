<template>
  <div class="rounded-full border-2 border-white p-1 hover:bg-white">
    <svg
      v-if="!state"
      @click.prevent="heartHandler"
      xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
    <svg
      v-else
      @click.prevent="heartHandler"
      xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
    </svg>
  </div>
</template>

<script>
import { likeState, createLike, removeLike } from '@/service/api';

export default {
  name: 'Heart',
  props: {
    auctionId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      state: false,
    };
  },
  methods: {
    heartHandler() {
      console.log('heartHandler');
      const paramsObj = {
        user_id: this.userId,
        auction_id: this.auctionId,
      };

      if (!this.state) {
        // 建立
        createLike(paramsObj)
          .then((res) => {
            if (res.status === 200) {
              console.log('新增愛心成功：', res);
              this.state = true;
              this.id = res.data.data.id;
            }
          });
      } else {
        // 移除
        removeLike(this.id)
          .then((res) => {
            if (res.status === 200) {
              console.log('移除 愛心成功：', res);
              this.state = false;
              this.id = '';
            }
          });
      }
    },
  },
  created() {
    likeState(this.userId, this.auctionId).then((res) => {
      console.log('user id:', this.userId);
      console.log('auction id:', this.auctionId);
      console.log('LIKE res: ', res);

      if (res.data.data === false) {
        this.state = false;
      } else {
        this.id = res.data.data.id;
        this.state = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
