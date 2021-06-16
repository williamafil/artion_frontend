<template>
  <div>
    <div
      class="w-full h-full bg-cover bg-center relative"
      style="height:32rem; background-image: url(https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80);"
    >
      <div
        class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50"
      >
        <h2 class="text-white text-5xl font-extrabold tracking-widest">
          所有拍賣
        </h2>
        <article
          class="absolute -bottom-20 lg:-bottom-14 h-52  w-3/4 sm:w-2/4 md:w-3/4 lg:w-5/6 lg:h-28 bg-gray-100 rounded-lg p-6"
        >
          <div
            class="flex w-full h-full items-center flex-col lg:flex-row mt-1 lg:m-2"
          >
            <select
              v-model="conditions.genre"
              class="border p-2 rounded mx-6 w-full sm:w-full mb-3 lg:m-2"
            >
              <option value="" selected="true">藝術品分類</option>
              <option
                v-for="genre in genreList"
                :key="genre.id"
                :value="genre.name"
              >
                {{ genre.name }}
              </option>
            </select>

            <select
              v-model="conditions.artist"
              class="border p-2 rounded mx-6 w-full sm:w-full mb-3 lg:m-2"
            >
              <option value="" selected="true">全部藝術家</option>
              <option
                v-for="artist in artistList"
                :key="artist.id"
                :value="artist.artist_info.name"
              >
                {{ artist.artist_info.name }}
              </option>
            </select>

            <div
              class="flex flex-col rounded mx-6 w-full sm:w-full mt-4 lg:m-0"
            >
              <!-- <div class="flex">
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
              </div> -->
              <div class="slider-body">
                <div class="wrapper">
                  <label
                    class="absolute bottom-10 left-0 right-0 text-sm font-semibold text-center"
                    for="vol"
                  >
                    價格範圍 ({{ conditions.minRange | dollar }}
                    ～
                    {{ conditions.maxRange | dollar }})
                  </label>
                  <div class="container">
                    <div class="slider-track"></div>

                    <input
                      id="slider-left"
                      ref="input-left"
                      type="range"
                      v-model.number="conditions.minRange"
                      :min="priceRange.min"
                      :max="priceRange.max"
                      @change="setLeftValue"
                      step="1000"
                    />
                    <input
                      id="slider-right"
                      ref="input-right"
                      type="range"
                      v-model.number="conditions.maxRange"
                      :min="priceRange.min"
                      :max="priceRange.max"
                      @change="setRightValue"
                      step="1000"
                    />
                  </div>
                </div>
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
            <AuctionCard
              v-for="item in filteredAuctions"
              :key="item.id"
              :item="item"
            />
            <!--  CARD  -->
          </div>
        </div>
      </section>
    </div>
    <!--  CARDS end  -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AuctionCard from '@/components/AuctionCard.vue';
import {
  fetchGenreList,
  fetchArtistList,
  fetchPriceRange,
} from '@/service/api';

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
    setLeftValue() {
      const leftHandle = this.$refs['input-left'].value;
      const rightHandle = this.$refs['input-right'].value;

      if (leftHandle >= rightHandle) {
        this.conditions.minRange = parseInt(rightHandle, 0) - 500;
      }
    },
    setRightValue() {
      const leftHandle = this.$refs['input-left'].value;
      const rightHandle = this.$refs['input-right'].value;

      if (rightHandle <= leftHandle) {
        this.conditions.maxRange = parseInt(leftHandle, 0) + 500;
      }
    },
  },
  computed: {
    ...mapState('auction', ['auctions']),
    filteredAuctions() {
      // console.log('this.conditions.genre:', this.conditions.genre);
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

<style lang="scss" scoped>
.slider-body {
}

.wrapper {
  @apply relative w-full h-10 bg-white p-3 border-2 border-gray-100 rounded;
}

.container {
  @apply relative w-full h-full mt-0;
}

input[type='range'] {
  @apply m-auto absolute z-20 top-0 bottom-0 appearance-none pointer-events-none w-full outline-none bg-transparent;
}

.slider-track {
  @apply absolute top-0 bottom-0 m-auto w-full h-3 bg-gray-200 rounded-md;
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  @apply h-1;
}

input[type='range']::-moz-range-track {
  -moz-appearance: none;
  @apply h-1;
}

input[type='range']::-ms-track {
  appearance: none;
  @apply h-1;
}

input[type='range']::-webkit-slider-thumb {
  @apply -mt-10px z-50 appearance-none pointer-events-auto h-6 w-6 bg-gray-500 border-2 border-gray-200 border-solid shadow cursor-pointer rounded-full;
}

input[type='range']::-moz-range-thumb {
  @apply z-50 appearance-none pointer-events-auto h-5 w-5 bg-gray-500 border-4 border-gray-200 shadow-sm cursor-pointer rounded-full;
}

input[type='range']::-ms-thumb {
  appearance: none;
  height: 1.4em;
  width: 1.4em;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3264fe;
  pointer-events: auto;
  z-index: 1000;
}

input[type='range']:active::-webkit-slider-thumb:before,
input[type='range']:active::-webkit-slider-thumb:after {
  @apply bg-gray-200 border-4 border-gray-500 border-solid shadow;
}

input[type='range']:active::-webkit-slider-thumb {
  @apply -mt-10px w-6 h-6 bg-gray-200 border-4 border-solid border-gray-500 shadow;
}

input[type='range']:active::-webkit-slider-thumb:after {
  @apply bg-gray-200 border-4 border-gray-500 border-solid shadow;
}

input[type='range']:active::-moz-range-thumb:before,
input[type='range']:active::-moz-range-thumb:after {
  @apply bg-gray-200 border-4 border-gray-500 shadow-sm;
}

input[type='range']:active::-moz-range-thumb {
  @apply w-5 h-5 -mt-3 bg-gray-200 border-4 border-gray-500 shadow-sm;
}

input[type='range']:active::-moz-range-thumb:after {
  @apply bg-gray-200 border-4 border-gray-500 shadow-sm;
}
</style>
