<template>
  <div x-data="{ cartOpen: false , isOpen: false }" class="bg-white">
    <header>
      <div class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-center">
          <h2
            class=" mt-20 text-5xl font-extrabold tracking-widest w-full md:text-center md:mt-4"
          >
            藝術家
          </h2>
        </div>

        <div class="relative mt-6 max-w-lg mx-auto">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866
                3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <input
            v-model="keyword"
            class="w-full border rounded-md pl-10 pr-4 py-2 focus:border-gray-500 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="搜尋"
          />
        </div>
      </div>
    </header>

    <main class="my-8">
      <div class="container mx-auto px-6">
        <div
          class="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          <router-link
            v-for="artist in filteredArtist"
            :key="artist.id"
            class="bg-gray-100 flex justify-center rounded p-2"
            :to="{ name: 'Artist', params: { id: artist.artist_info.name } }"
          >
            <div class="w-2/6 sm:w-3/6 h-52 py-2 flex flex-col justify-around">
              <div
                class=" relative circle-responsive object-cover overflow-hidden"
              >
                <img class="object-cover" :src="artist.avatar_url" />
              </div>
              <h3 class="text-center mt-4">{{ artist.artist_info.name }}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { fetchArtists } from '@/service/api';

export default {
  name: 'ArtistList',
  data() {
    return {
      keyword: '',
      artistList: [],
    };
  },
  created() {
    this.getArtists();
  },
  methods: {
    getArtists() {
      fetchArtists()
        .then((res) => {
          this.artistList = res.data.data;
        })
        .catch((error) => {
          console.error('fetchArtistList錯誤：', error);
        });
    },
  },
  computed: {
    filteredArtist() {
      return this.artistList.filter((x) => x.artist_info.name.includes(this.keyword));
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-responsive {
  background: #ddd;
  border-radius: 50%;
  height: 0;
  padding-bottom: 100%;
  width: 100%;
}
</style>
