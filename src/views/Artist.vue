<template>
  <div class="container mx-auto">
    <div class="flex">
      <section class="w-1/2 bg-yellow-200 px-10">
        <div class="mt-20 w-36 h-36 rounded-full overflow-hidden">
          <img
            class="object-cover"
            :src="info.user.avatar_url"
          />
        </div>
        <h2 class="my-3 w-36 text-center font-bold tracking-widest ">{{ info.name }}</h2>
        <p class="my-10 tracking-widest leading-loose text-justify" v-html="info.description">
          <!-- {{info.description}} -->
        </p>
      </section>

      <section class="w-1/2 p-10 flex flex-col items-center">
        <div class="my-5 h-96"></div>
        <div v-for="(img, index) in info.arts_url" :key="index">
          <img
            class=" w-72 mt-20"
            :src="img.url"
          />
          <h3 class="text-xl font-thin mt-2 mb-10">{{img.filename}}</h3>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { fetchArtistInfo } from '@/service/api';

export default {
  name: 'Artist',
  data() {
    return {
      info: {},
    };
  },
  created() {
    fetchArtistInfo(this.$route.params.id).then((res) => {
      console.log(res);
      this.info = res.data.data;
    });
  },
};
</script>

<style scoped></style>
