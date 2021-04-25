<template>
  <div>
    <div
      class="w-full h-full bg-cover bg-center relative"
      style="height:32rem; background-image: url(https://images.unsplash.com/photo-1572450732467-5eb1311e7bc8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2534&q=80);"
    >
      <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
        <article class="absolute -bottom-20 w-3/4 bg-gray-100 rounded-lg p-6">
          <div class="flex w-full">
            <select v-model="conditions.genre" class="border p-2 rounded mx-6 w-2/6">
              <option value="" selected="true" disabled="disabled">藝術品分類</option>
              <option v-for="genre in genreList" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </select>

            <select v-model="conditions.artist" class="border p-2 rounded mx-6 w-2/6">
              <option value="" selected="true" disabled="disabled">藝術家</option>
              <option v-for="artist in genreList" :key="artist.id" :value="artist.id">
                {{ artist.artist_info.name }}
              </option>
            </select>

            <select v-model="priceRange" class="border p-2 rounded mx-6 w-2/6">
              <option>價格</option>
              <option>Round-trip</option>
              <option>Missouri</option>
              <option>texas</option>
            </select>

            <input type="text" class="border p-2 rounded mx-6 w-2/6" placeholder="輸入關鍵字" />
          </div>
          <div class="flex justify-center mt-6">
            <button class="p-2 border w-20 rounded-md bg-gray-800 text-white tracking-widest">
              搜尋
            </button>
          </div>
        </article>
      </div>
    </div>
    <div class="mb-20 h-20"></div>
    <!--  CARDS begin  -->
    <div class="my-10 flex justify-center">
      <section class="flex flex-col w-full">
        <div class="container my-3 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap">
            <!--  CARD  -->
            <AuctionCard v-for="item in filteredAuctions" :key="item.id" :item="item" />
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
import { fetchGenreList, fetchArtistList } from '@/service/api';

export default {
  name: 'AuctionList',
  components: { AuctionCard },
  data() {
    return {
      genreList: [],
      artistList: [],
      conditions: {
        genre: '',
        artist: '',
        price: '',
        priceRange: {
          min: 1000,
          max: 5000,
        },
        keyword: '',
      },
    };
  },
  created() {
    if (this.auctions.length === 0) {
      console.log('在 vuex state 沒有存放 auctions');
      this.$store.dispatch('auction/getAuctions');
    }
    // this.$store.dispatch('getPriceRange');
    // this.$store.dispatch('getGenreList');
    // this.$store.dispatch('getArtistList');
    fetchGenreList().then((res) => {
      this.genreList = res.data.data;
    });
    fetchArtistList().then((res) => {
      this.artistList = res.data.data;
    });
  },
  computed: {
    ...mapState('auction', ['auctions']),
    // ...mapState(['genres', 'artists']),
    filteredAuctions() {
      return this.auctions;
    },
  },
};
</script>

<style lang="scss" scoped></style>
