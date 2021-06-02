<template>
  <div class="leading-loose flex justify-center">
    <form
      @submit.prevent="submit"
      class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
            px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
    >
      <h2 class="mb-6 text-center font-semibold text-3xl lg:text-3xl text-gray-800">
        登記為藝術家
      </h2>
      <div class="">
        <label class="block text-sm text-gray-00" for="reg-artist-name">姓名</label>
        <input
          v-model="name"
          class="block w-full py-3 px-3
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
          id="reg-artist-name"
          name="reg-artist-name"
          type="text"
          required=""
          placeholder=""
          aria-label="Name"
        />
      </div>
      <div class="mt-2">
        <label class="block text-sm text-gray-600" for="reg-artist-email">聯繫Email</label>
        <input
          v-model="email"
          class="block w-full py-3 px-3
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
          id="reg-artist-email"
          name="reg-artist-email"
          type="text"
          required=""
          placeholder=""
          aria-label="Email"
        />
      </div>
      <div class="mt-2">
        <label class=" block text-sm text-gray-600" for="reg-artist-description">關於你自己</label>
        <textarea
          v-model="description"
          class="block w-full py-3 px-3
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
          id="reg-artist-description"
          name="reg-artist-description"
          type="text"
          required=""
          placeholder=""
          aria-label="Email"
        />
      </div>
      <div class="mt-4">
        <button
          class="w-full py-3 mt-2 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
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
