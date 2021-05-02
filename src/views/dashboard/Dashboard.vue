<template>
  <div>
    <div class="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
      <!-- <div class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"></div> -->
      <div class="z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white">
        <!-- <div
        class="fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-white dark:bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
      > -->
        <!-- <div class="flex items-center justify-center mt-8">
          <div class="flex items-center">
            <router-link
              :to="{ name: 'Dashboard' }"
              class="text-gray-800 dark:text-white text-2xl font-semibold"
            >
              Dashboard
            </router-link>
          </div>
        </div> -->
        <nav class="flex flex-col mt-10 px-4 text-center">
          <router-link
            :to="{ name: 'UserProfile' }"
            active-class="bg-yellow-200"
            class="mt-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 rounded"
          >
            個人資訊
          </router-link>
          <router-link
            v-if="isArtist"
            :to="{ name: 'Sell' }"
            active-class="bg-yellow-200"
            class="mt-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 rounded"
          >
            刊登拍賣
          </router-link>
          <router-link
            :to="{ name: 'Bids' }"
            active-class="bg-yellow-200"
            class="mt-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 rounded"
          >
            我的競標
          </router-link>
          <router-link
            v-if="isArtist"
            :to="{ name: 'ArtistAuction' }"
            active-class="bg-yellow-200"
            class="mt-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 rounded"
          >
            我的拍賣
          </router-link>
          <router-link
            :to="{ name: 'Follows' }"
            active-class="bg-yellow-200"
            class="mt-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 rounded"
          >
            我的關注
          </router-link>
          <router-link
            :to="{ name: 'Order' }"
            active-class="bg-yellow-200"
            class="mt-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 rounded"
          >
            我的訂單
          </router-link>
        </nav>
      </div>
      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="flex justify-between items-center px-6 pt-6 pb-2">
          <div class="flex items-center space-x-4 lg:space-x-0">
            <button class="text-gray-500 dark:text-gray-300 focus:outline-none lg:hidden">
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <div>
              <h1 class="text-2xl font-medium text-gray-800 dark:text-white">我的帳戶</h1>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-x-hidden overflow-y-auto">
          <div class="container mx-auto px-6 py-4">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['isArtist']),
  },
};
</script>

<style lang="scss" scoped></style>
