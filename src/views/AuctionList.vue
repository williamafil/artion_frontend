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
          class="absolute -bottom-20 lg:-bottom-14 h-80  w-3/4 sm:w-2/4 md:w-3/4 lg:w-5/6 lg:h-28 bg-gray-100 rounded-lg p-6"
        >
          <!-- <article
          class="absolute -bottom-20 lg:-bottom-14 h-52  w-3/4 sm:w-2/4 md:w-3/4 lg:w-5/6 lg:h-28 bg-gray-100 rounded-lg p-6"
        > -->
          <div class="flex w-full h-full items-center flex-col lg:flex-row">
            <select
              v-model="conditions.genre"
              class="border p-2 rounded mx-6 w-full sm:w-full mb-2"
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
              class="border p-2 rounded mx-6 w-full sm:w-full mb-2"
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

            <div class="flex flex-col p-2 rounded mx-6 w-full sm:w-full">
              <label class="text-sm text-center" for="vol"
                >價格範圍 ({{ conditions.minRange | separator | dollar }} ～
                {{ conditions.maxRange | separator | dollar }}):</label
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
                  <div class="values">
                    <span id="left-range">0</span>
                    <span>&dash;</span>
                    <span id="right-range">100</span>
                  </div>
                  <div class="container">
                    <div class="slider-track"></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="30"
                      id="slider-left"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="70"
                      id="slider-right"
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
    <br /><br /><br />
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
      // console.log('在 vuex state 沒有存放 auctions');
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
      const { min, max } = this.$refs['input-left'];
      const leftHandle = this.$refs['input-left'].value;
      const rightHandle = this.$refs['input-right'].value;

      const thisVal = Math.min(
        parseInt(leftHandle, 0),
        parseInt(rightHandle, 0) - 1,
      );
      const percent = ((thisVal - min) / (max - min)) * 100;

      this.$refs['left-handle'].style.left = `${percent}%`;
      this.$refs.range.style.left = `${percent}%`;

      console.log('left thisVal: ', thisVal);
      console.log('conditions.minRange: ', this.conditions.minRange);
      if (leftHandle >= rightHandle) {
        this.conditions.minRange = parseInt(rightHandle, 0) - 100;
      }
    },
    setRightValue() {
      const { min, max } = this.$refs['input-right'];
      const leftHandle = this.$refs['input-left'].value;
      const rightHandle = this.$refs['input-right'].value;

      console.log(
        'current leftHand: ',
        leftHandle,
        'current rightHand:',
        rightHandle,
      );

      const thisVal = Math.max(
        parseInt(rightHandle, 0),
        parseInt(leftHandle, 0) + 1,
      );
      const percent = ((thisVal - min) / (max - min)) * 100;

      this.$refs['right-handle'].style.right = `${100 - percent}%`;
      this.$refs.range.style.right = `${100 - percent}%`;

      console.log('right thisVal: ', thisVal);
      console.log('conditions.maxRange: ', this.conditions.maxRange);
      if (rightHandle <= leftHandle) {
        this.conditions.maxRange = parseInt(leftHandle, 0) + 100;
      }
    },
  },
  computed: {
    ...mapState('auction', ['auctions']),
    // ...mapState(['genres', 'artists']),
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
// .middle {
//   @apply relative w-full p-2  max-w-lg h-10;
// }

// .slider {
//   @apply relative z-10 h-4;
// }

// .slider > .track {
//   @apply absolute z-10 left-0 right-0 top-0 bottom-0 rounded-md bg-gray-300;
// }

// .slider > .range {
//   @apply absolute z-20 left-0 right-0 top-0 bottom-0 rounded-md bg-gray-500;
// }

// .slider > .thumb {
//   @apply absolute z-30 w-6 h-6 bg-gray-700 rounded-full;
// }

// .slider > .thumb.left {
//   @apply left-0 transform -translate-x-2 -translate-y-1;
// }

// .slider > .thumb.right {
//   @apply right-0 transform translate-x-2 -translate-y-1;
// }

// input[type='range'] {
//   @apply absolute z-20 h-3 w-full appearance-none pointer-events-none opacity-100;
//   // @apply absolute z-20 h-3 w-full appearance-none pointer-events-none opacity-0;
// }

// input[type='range']::-webkit-slider-thumb {
//   //   // pointer-events: all;
//   //   // width: 24px;
//   //   // height: 24px;
//   //   // -webkit-appearance: none;

//   // @apply w-6 h-6 rounded-none border-0 bg-red-400  appearance-none pointer-events-auto;
//   @apply w-6 h-6 rounded-full  bg-green-400  appearance-none pointer-events-auto;
// }

// #input-left {
//   @apply top-16;
// }

// #input-right {
//   @apply top-16;
// }

.slider-body {
  height: 100px;
  display: grid;
  display: -ms-grid;
  background-color: #3264fe;
  place-items: center;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  // height: 100%;
  background-color: #fff;
  padding: 0;
  // padding: 20px 14px 10px 14px;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  // border: 1px solid #000;
  margin-top: 0px;
  // margin-top: 20px;
}

input[type='range'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}

.slider-track {
  width: 100%;
  height: 5px;
  background-color: #d5d5d5;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 5px;
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 5px;
  // background-color: #ccc;
}

input[type='range']::-moz-range-track {
  -moz-appearance: none;
  height: 5px;
}

input[type='range']::-ms-track {
  appearance: none;
  height: 5px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.7em;
  width: 1.7em;
  background-color: #3264fe;
  cursor: pointer;
  border-radius: 50%;
  margin-top: -9px;
  pointer-events: auto;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1.7em;
  width: 1.7em;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3264fe;
  pointer-events: auto;
}

input[type='range']::-ms-thumb {
  appearance: none;
  height: 1.7em;
  width: 1.7em;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3264fe;
  pointer-events: auto;
}

input[type='range']:active::-webkit-slider-thumb {
  background-color: #ffffff;
  border: 4px solid #3264fe;
}

.values {
  background-color: #3264fe;
  width: 32%;
  position: relative;
  margin: auto;
  padding: 10px 0;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  color: #fff;
}

.values:before {
  content: '';
  position: absolute;
  height: 0;
  width: 0;
  border-top: 15px solid #3264fe;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  margin: auto;
  bottom: -15px;
  left: 0;
  right: 0;
}
</style>
