<template>
  <div>
    <div
      class="w-full h-full bg-cover bg-center relative"
      style="height:32rem; background-image: url(https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80);"
    >
      <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
        <h2 class="text-white text-5xl font-extrabold tracking-widest">所有拍賣</h2>
        <article class="absolute -bottom-10 h-28 w-3/4 bg-gray-100 rounded-lg p-6">
          <div class="flex w-full h-full items-center">
            <select v-model="conditions.genre" class="border p-2 rounded mx-6 w-2/6">
              <option value="" selected="true">藝術品分類</option>
              <option v-for="genre in genreList" :key="genre.id" :value="genre.name">
                {{ genre.name }}
              </option>
            </select>

            <select v-model="conditions.artist" class="border p-2 rounded mx-6 w-2/6">
              <option value="" selected="true">全部藝術家</option>
              <option
                v-for="artist in artistList"
                :key="artist.id"
                :value="artist.artist_info.name"
              >
                {{ artist.artist_info.name }}
              </option>
            </select>

            <div class="flex flex-col p-2 rounded mx-6 w-2/6">
              <label class="text-sm" for="vol"
                >價格範圍 ({{ conditions.minRange | separator | dollar }} ～
                {{ conditions.maxRange | separator | dollar }}):</label
              >
              <div class="flex">
                <input
                  type="range"
                  v-model="conditions.minRange"
                  :min="priceRange.min"
                  :max="priceRange.max"
                  step="100"
                />
                <input
                  type="range"
                  v-model="conditions.maxRange"
                  :min="conditions.minRange"
                  :max="priceRange.max"
                  step="100"
                />
              </div>
            </div>
          </div>

        </article>
      </div>
    </div>
    <div class="mb-10 h-10"></div>
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
import { fetchGenreList, fetchArtistList, fetchPriceRange } from '@/service/api';

export default {
  name: 'AuctionList',
  components: { AuctionCard },
  data() {
    return {
      genreList: [],
      artistList: [],
      priceRange: {
        min: 0,
        max: 0,
      },
      conditions: {
        genre: '',
        artist: '',
        price: '',
        minRange: '0',
        maxRange: '0',
        keyword: '',
      },
    };
  },
  created() {
    if (this.auctions.length === 0) {
      console.log('在 vuex state 沒有存放 auctions');
      this.$store.dispatch('auction/getAuctions');
    }
    this.getGenres();
    this.getArtists();
    this.getPriceRange();
  },
  methods: {
    getGenres() {
      fetchGenreList()
        .then((res) => {
          this.genreList = res.data.data;
        })
        .catch((error) => {
          console.error('fetchGenreList錯誤：', error);
        });
    },
    getArtists() {
      fetchArtistList()
        .then((res) => {
          this.artistList = res.data.data;
        })
        .catch((error) => {
          console.error('fetchArtistList錯誤：', error);
        });
    },
    getPriceRange() {
      fetchPriceRange().then((res) => {
        this.priceRange.min = res.data.data.min;
        this.conditions.minRange = res.data.data.min;
        this.priceRange.max = res.data.data.max;
        this.conditions.maxRange = res.data.data.max;
      });
    },
  },
  computed: {
    ...mapState('auction', ['auctions']),
    // ...mapState(['genres', 'artists']),
    filteredAuctions() {
      console.log('this.conditions.genre:', this.conditions.genre);
      return this.auctions
        .filter((x) => x.genre.name.includes(this.conditions.genre))
        .filter((x) => x.author_name.includes(this.conditions.artist))
        .filter((x) => {
          if (
            x.bidding_price >= this.conditions.minRange &&
            x.bidding_price <= this.conditions.maxRange
          ) {
            return x;
          }
          return '';
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
