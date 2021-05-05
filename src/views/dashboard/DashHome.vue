<template>
  <main>
    <div class="grid mb-4 pb-10 px-0 mx-2 rounded-3xl bg-gray-100">
      <div class="grid grid-cols-12 gap-6">
        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
          <div class="col-span-12">
            <div class="grid grid-cols-12 gap-6">
              <div
                class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-yellow-50 cursor-pointer"
              >
                <div class="p-5">
                  <div class="flex justify-between">
                    <MultipleHeart class="text-2xl text-pink-600" />
                    <div class="mt-1 text-lg font-bold text-gray-600">關注</div>
                    <!-- <div
                      class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm"
                    >
                      <span class="flex items-center">30%</span>
                    </div> -->
                  </div>
                  <div class="ml-2 w-full flex justify-center">
                    <div class="mb-3 text-6xl font-bold leading-8">{{ numberOfFollows }}</div>
                  </div>
                </div>
              </div>
              <div
                class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-yellow-50 cursor-pointer"
              >
                <div class="p-5">
                  <div class="flex justify-between">
                    <AuctionFill class="text-2xl text-pink-600" />
                    <div class="mt-1 text-lg font-bold text-gray-600">競標</div>
                  </div>
                  <div class="ml-2 w-full flex justify-center">
                    <div class="mb-3 text-6xl font-bold leading-8">{{ numberOfBids }}</div>
                  </div>
                </div>
              </div>
              <div
                v-if="isLoggedIn && isArtist"
                class="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-yellow-50 cursor-pointer"
              >
                <div class="p-5">
                  <div class="flex justify-between">
                    <SellFill class="text-2xl text-pink-600" />
                    <div class="mt-1 text-lg font-bold text-gray-600">拍賣</div>
                  </div>
                  <div class="ml-2 w-full flex justify-center">
                    <div class="mb-3 text-6xl font-bold leading-8">{{ numberOfAuctions }}</div>
                  </div>
                </div>
              </div>
              <div
                class="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-yellow-50 cursor-pointer"
              >
                <div class="p-5">
                  <div class="flex justify-between">
                    <Cart class="text-2xl text-pink-600" />
                    <div class="mt-1 text-lg font-bold text-gray-600">得標</div>
                    <!-- <div
                      class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm"
                    >
                      <span class="flex items-center">30%</span>
                    </div> -->
                  </div>
                  <div class="ml-2 w-full flex justify-center">
                    <div class="mb-3 text-6xl font-bold leading-8">{{ numberOfUnpaidOrders }}</div>

                    <!-- <div class="mt-1 text-lg font-bold text-gray-600">關注</div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 mt-5">
            <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
              <div class="bg-white p-4 shadow-lg rounded-lg">
                <h2 class="font-bold text-xl tracking-wider">歡迎來到 Artion</h2>
                <hr class="w-40 mt-1 mb-3" />
                <h3>歡迎使用您的帳戶，從這裡您可以：</h3>

                <ul>
                  <li class="list-inside list-disc">編輯您的個人資料</li>
                  <li class="list-inside list-disc">查看您所關注的拍賣</li>
                  <li class="list-inside list-disc">追蹤已下標的拍賣品</li>
                  <li class="list-inside list-disc">追蹤拍賣品狀態</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="col-span-12 mt-5">
            <div class="grid gap-2 grid-cols-1 lg:grid-cols-2">
              <div class="bg-white shadow-lg p-4" id="chartline"></div>
              <div class="bg-white shadow-lg" id="chartpie"></div>
            </div>
          </div> -->
          <!-- <div class="col-span-12 mt-5">
            <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
              <div class="bg-white p-4 shadow-lg rounded-lg">
                <h1 class="font-bold text-base">Table</h1>
                <div class="mt-4">
                  <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto">
                      <div class="py-2 align-middle inline-block min-w-full">
                        <div
                          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"
                        >
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th
                                  class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <div class="flex cursor-pointer">
                                    <span class="mr-2">PRODUCT NAME</span>
                                  </div>
                                </th>
                                <th
                                  class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <div class="flex cursor-pointer">
                                    <span class="mr-2">Stock</span>
                                  </div>
                                </th>
                                <th
                                  class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <div class="flex cursor-pointer">
                                    <span class="mr-2">STATUS</span>
                                  </div>
                                </th>
                                <th
                                  class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <div class="flex cursor-pointer">
                                    <span class="mr-2">ACTION</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>Apple MacBook Pro 13</p>
                                  <p class="text-xs text-gray-400">PC & Laptop</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>77</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-green-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="w-5 h-5 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p>Active</p>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex space-x-4">
                                    <a href="#" class="text-blue-500 hover:text-blue-600">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                      <p>Edit</p>
                                    </a>
                                    <a href="#" class="text-red-500 hover:text-red-600">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1 ml-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                      <p>Delete</p>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { authComputed } from '@/store/helpers';
import { userData } from '@/service/api';
import { mapState, mapGetters } from 'vuex';
import MultipleHeart from '@/components/icons/MultipleHeart.vue';
import AuctionFill from '@/components/icons/AuctionFill.vue';
import SellFill from '@/components/icons/SellFill.vue';
import Cart from '@/components/icons/Cart.vue';

export default {
  name: 'DashHome',
  components: {
    MultipleHeart,
    AuctionFill,
    SellFill,
    Cart,
  },
  data() {
    return {
      numberOfFollows: 0,
      numberOfBids: 0,
      numberOfAuctions: 0,
      numberOfUnpaidOrders: 0,
    };
  },
  created() {
    // console.log('USER ID: ', this.user.id);
    userData(this.user.id).then((res) => {
      this.numberOfFollows = res.data.data.number_of_follows;
      this.numberOfBids = res.data.data.number_of_bids;
      this.numberOfAuctions = res.data.data.number_of_auctions;
      this.numberOfUnpaidOrders = res.data.data.number_of_unpaid_orders;
    });
  },
  computed: {
    ...authComputed,
    ...mapState('user', ['user']),
    ...mapGetters('user', ['isArtist']),
  },
};
</script>

<style lang="scss" scoped></style>
