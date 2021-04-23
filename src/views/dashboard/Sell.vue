<template>
  <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="bg-gray-50 relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="flex items-center space-x-5">
            <div
              class="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono"
            >
              i
            </div>
            <div class="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 class="leading-relaxed">刊登藝術品</h2>
              <p class="text-sm text-gray-500 font-normal leading-relaxed">
                如有特殊拍賣需求，請透過<u>電子郵件信箱</u>聯繫我們。
              </p>
            </div>
          </div>
          <form enctype="multipart/form-data" @submit.prevent="submit">
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex flex-col">
                  <label class="leading-loose">藝術品名稱</label>
                  <input
                    v-model="title"
                    type="text"
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div class="flex flex-col">
                  <label class="leading-loose">描述</label>
                  <textarea
                    v-model="description"
                    type="text"
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col">
                    <label class="leading-loose">起始時間</label>
                    <div class="relative focus-within:text-gray-600 text-gray-400">
                      <flatPickr
                        v-model="startTime"
                        :config="configs.start"
                        @on-change="onStartChange"
                        class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      <div class="absolute left-3 top-2">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <label class="leading-loose">結束時間</label>
                    <div class="relative focus-within:text-gray-600 text-gray-400">
                      <flatPickr
                        v-model="endTime"
                        :config="configs.end"
                        @on-change="onEndChange"
                        class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      <div class="absolute left-3 top-2">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex flex-col w-full">
                    <label class="leading-loose">起標價格</label>
                    <div class="focus-within:text-gray-600 text-gray-400">
                      <input
                        v-model="fBiddingPrice"
                        type="text"
                        class="pr-4 pl-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        :placeholder="1000000 | separator | dollar"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="leading-loose">標價間格</label>
                    <div class="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        v-model="fInterval"
                        type="text"
                        class="pr-4 pl-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        :placeholder="100000 | separator | dollar"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="leading-loose">上傳圖片</label>
                  <!-- <input name="files" type="file" data-direct-upload-url="/rails/active_storage/direct_uploads" direct_upload="true" /> -->

                  <input
                    @change="onChangeHandler"
                    accept="image/png, image/jpeg"
                    name="images[]"
                    id="uploader"
                    type="file"
                    class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    multiple
                  />
                </div>

                <div class="flex items-center space-x-4">
                  <div class="flex flex-col w-full">
                    <label for="genre" class="leading-loose">類別</label>
                    <div class="relative focus-within:text-gray-600 text-gray-400">
                      <select
                        v-model="genre"
                        id="genre"
                        class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      >
                        <option value="" disabled>請選擇一個分類</option>
                        <option value="1">油畫</option>
                        <option value="2">肖像</option>
                        <option value="3">水彩</option>
                        <option value="4">塗鴉</option>
                        <option value="5">雕塑</option>
                        <option value="6">攝影</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 flex items-center space-x-4">
                <button
                  class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  <svg
                    class="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  取消
                </button>
                <button
                  class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  送出
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import flatpickr from 'flatpickr';
// import flatPickrComponent from 'vue-flatpickr-component';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

// Override Global settings
// flatpickr.setDefaults({
//   disableMobile: true,
//   onClose: () => {
//     console.log('close event from global config');
//   },
// });

export default {
  name: 'Sell',
  components: { flatPickr },
  data() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return {
      title: '',
      description: '',
      biddingPrice: '',
      interval: '',
      startTime: '',
      endTime: '',
      isActive: false,
      genre: '',
      files: [],
      configs: {
        start: {
          minDate: tomorrow,
          maxDate: null,
        },
        end: {
          minDate: tomorrow,
        },
      },
    };
  },
  computed: {
    ...mapState('user', ['user']),
    fBiddingPrice: {
      // getter
      get() {
        if (this.biddingPrice !== '') {
          return this.formatUSD(this.biddingPrice);
        }
        return this.biddingPrice;
      },
      // setter
      set(newValue) {
        this.biddingPrice = this.parseUSD(newValue);
      },
    },
    fInterval: {
      // getter
      get() {
        if (this.interval !== '') {
          return this.formatUSD(this.interval);
        }
        return this.interval;
      },
      // setter
      set(newValue) {
        this.interval = this.parseUSD(newValue);
      },
    },
  },
  methods: {
    onStartChange(selectedDates, dateStr, instance) {
      console.log('instance: ', instance);
      this.$set(this.configs.end, 'minDate', dateStr);
    },
    onEndChange(selectedDates, dateStr, instance) {
      console.log('instance: ', instance);
      this.$set(this.configs.start, 'maxDate', dateStr);
    },

    submit() {
      console.log('submit');
      const imgs = document.querySelector('#uploader');
      console.dir(imgs);
      console.log(imgs.files);
      console.log('files[0]: ', imgs.files[0]);
      console.log('length: ', imgs.files.length);
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('bidding_price', this.biddingPrice);
      formData.append('interval', this.interval);
      formData.append('start_time', this.startTime);
      formData.append('end_time', this.endTime);
      formData.append('is_active', this.isActive);
      formData.append('user_id', this.user.id);
      formData.append('genre_id', this.genre);
      // formData.append('images[]', imgs.files[0]);

      for (let i = 0; i < imgs.files.length; i += 1) {
        formData.append('images[]', imgs.files[i]);
      }
      // formData.append('images[]', this.files);
      // formData.append('images', this.files);

      this.$store.dispatch('auction/createAuction', formData);
    },

    onChangeHandler(e) {
      this.files = e.target.files;
    },
    formatUSD(num) {
      // return (
      //   '$ ' + Number(num).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$ 1,')
      // );
      return `$${Number(num)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
    },
    parseUSD(text) {
      return Number(text.replace('$', '').replace(/,/g, ''));
    },
  },
};
</script>

<style lang="scss" scoped></style>
