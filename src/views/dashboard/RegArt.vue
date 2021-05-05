<template>
  <div class="leading-loose flex justify-center">
    <form
      @submit.prevent="submit"
      class="md:w-3/5 lg:w-2/5 m-4 p-10 bg-white rounded shadow-md lg:shadow-lg"
    >
      <p class="text-gray-800 font-extrabold">登記為藝術家</p>
      <div class="">
        <label class="block text-sm text-gray-00" for="reg-artist-name">姓名</label>
        <input
          v-model="name"
          class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
          id="reg-artist-name"
          name="reg-artist-name"
          type="text"
          required=""
          placeholder="Your Name"
          aria-label="Name"
        />
      </div>
      <div class="mt-2">
        <label class="block text-sm text-gray-600" for="reg-artist-email">聯繫Email</label>
        <input
          v-model="email"
          class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
          id="reg-artist-email"
          name="reg-artist-email"
          type="text"
          required=""
          placeholder="Your Email"
          aria-label="Email"
        />
      </div>
      <div class="mt-2">
        <label class=" block text-sm text-gray-600" for="reg-artist-description">關於你自己</label>
        <textarea
          v-model="description"
          class="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
          id="reg-artist-description"
          name="reg-artist-description"
          type="text"
          required=""
          placeholder="Artist description"
          aria-label="Email"
        />
      </div>
      <div class="mt-4">
        <button
          class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
          type="submit"
        >
          送出
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterArtist',
  data() {
    return {
      name: '',
      email: '',
      description: '',
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch('user/registerAsArtist', {
          is_artist: true,
          artist_info_attributes: {
            name: this.name,
            email: this.email,
            description: this.description,
          },
        })
        .then(() => {
          // console.log('更新成藝術家成功');
          this.$router.push({ name: 'UserProfile' });
        });
    },
  },
};
</script>

<style scoped></style>
