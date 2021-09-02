<template>
  <footer class="w-full h-80 border-t-2 pl-4">
    <div class="container h-full flex flex-col md:flex-row md:justify-center">
      <section class="mt-6">
        <h2 class="mr-20 text-3xl font-black tracking-wide">
          artion
        </h2>
      </section>
      <section class="mt-4 md:pt-4 w-full flex justify-between">
        <div class="h-full w-1/3 ">
          <ul class="text-left">
            <li class="mb-4 text-sm font-semibold">
              <router-link :to="{ name: 'AuctionList' }">
                拍賣
              </router-link>
            </li>
            <li class="my-4 text-sm font-semibold">
              <router-link :to="{ name: 'ArtistList' }">
                藝術家
              </router-link>
            </li>
            <li class="my-4 text-sm font-semibold">
              <router-link :to="{ name: 'Exhibition' }">
                精選展覽
              </router-link>
            </li>
            <li class="my-4 text-sm font-semibold">
              <router-link :to="{ name: 'About' }">
                關於我們
              </router-link>
            </li>
            <li class="my-4 text-sm font-semibold">
              運送及付款
            </li>
            <li class="my-4 text-sm font-semibold">
              <router-link :to="{ name: 'Contact' }">
                聯繫我們
              </router-link>
            </li>
          </ul>
        </div>
        <div class="h-full w-1/3">
          <ul class="text-left">
            <li class="mb-4 text-sm font-semibold">如何競標</li>
            <li class="my-4 text-sm font-semibold">如何拍賣</li>
            <li class="my-4 text-sm font-semibold">Privacy Policy</li>
            <li class="my-4 text-sm font-semibold">Terms</li>
          </ul>
        </div>
        <div class="flex flex-col h-full w-1/3 text-left">
          <form @submit.prevent="subscribe">
            <label class="mb-2 text-sm">訂閱最新消息</label>
            <input
              type="email"
              class="mb-2 w-11/12 h-10 p-2 border rounded-md"
              placeholder="e-mail"
            />
            <button class="self-end border-2 w-16 p-1 text-sm rounded">
              訂閱
            </button>
          </form>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    subscribe(e) {
      e.target[0].value = '';
      const notification = {
        type: 'SUCCESS',
        message: '訂閱成功！',
      };
      this.$store.dispatch('notification/add_notification', notification);
    },
  },
};
</script>

<style lang="scss" scoped></style>
