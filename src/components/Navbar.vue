<template>
  <div class="z-50 w-full bg-gray-100 fixed md:relative">
    <!-- Mobile Menu -->
    <div
      :class="{ 'hidden bg-blue-100': !isMenuOpen }"
      class="z-20 fixed top-16 bottom-0 left-0 right-0 md:hidden bg-gray-50 h-screen w-full"
    >
      <ul class="text-center mt-10">
        <li class="my-16">
          <router-link
            :to="{ name: 'Home' }"
            active-class=""
            exact-active-class="border-b-8 border-gray-500"
            class="text-4xl tracking-widest font-semibold hover:text-yellow-400"
          >
            首頁
          </router-link>
        </li>
        <li class="my-16">
          <router-link
            :to="{ name: 'AuctionList' }"
            active-class="border-b-8 border-gray-500"
            class="text-4xl tracking-widest font-semibold hover:text-yellow-400"
          >
            拍賣
          </router-link>
        </li>
        <li class="my-16">
          <router-link
            :to="{ name: 'ArtistList' }"
            active-class="border-b-8 border-gray-500"
            class="text-4xl tracking-widest font-semibold hover:text-yellow-400"
          >
            藝術家
          </router-link>
        </li>
        <li class="my-16">
          <router-link
            :to="{ name: 'Exhibition' }"
            active-class="border-b-8 border-gray-500"
            class="text-4xl tracking-widest font-semibold hover:text-yellow-400"
          >
            精選展覽
          </router-link>
        </li>
        <li class="my-16">
          <router-link
            :to="{ name: 'About' }"
            active-class="border-b-8 border-gray-500"
            class="text-4xl tracking-widest font-semibold hover:text-yellow-400"
          >
            關於我們
          </router-link>
        </li>
        <li class="my-16">
          <router-link
            :to="{ name: 'Contact' }"
            active-class="border-b-8 border-gray-500"
            class="text-4xl tracking-widest font-semibold hover:text-yellow-400"
          >
            聯繫我們
          </router-link>
        </li>
        <li>
          <button
            @click.prevent="toggleMenu"
            class="font-medium text-md p-2 rounded border-2 border-gray-200 tracking-wide"
          >
            關閉選單
          </button>
        </li>
      </ul>
    </div>
    <div class="absolute inset-0 shadow-lg opacity-50 z-40"></div>

    <!-- Desktop Menu -->
    <header
      class="z-50 w-full h-16 z-thousand sticky top-0 px-5 py-3 flex justify-between
          items-center container mx-auto"
    >
      <div class="flex">
        <button class="md:hidden focus:outline-none" @click="toggleMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 bg-gray-100"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
              stroke="black"
            />
          </svg>
        </button>
      </div>

      <div
        class="z-10 hidden md:block w-34 bg-yellow-200 border-b-4 border-yellow-300 px-4"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="font-lora text-4xl font-extrabold mx-5 my-1 p-1"
        >
          <h1>artion</h1>
        </router-link>
      </div>
      <div class="z-10 hidden md:block flex-grow">
        <div class="flex justify-center">
          <router-link
            :to="{ name: 'AuctionList' }"
            active-class="border-b-4 border-gray-500"
            class="text-base font-semibold mx-5 hover:text-yellow-400"
          >
            拍賣
          </router-link>
          <router-link
            :to="{ name: 'ArtistList' }"
            active-class="border-b-4 border-gray-500"
            class="text-base font-semibold mx-5 hover:text-yellow-400"
          >
            藝術家
          </router-link>
          <router-link
            :to="{ name: 'Exhibition' }"
            active-class="border-b-4 border-gray-500"
            class="text-base font-semibold mx-5 hover:text-yellow-400"
          >
            精選展覽
          </router-link>
          <router-link
            :to="{ name: 'About' }"
            active-class="border-b-4 border-gray-500"
            class="text-base font-semibold mx-5 hover:text-yellow-400"
          >
            關於我們
          </router-link>
          <router-link
            :to="{ name: 'Contact' }"
            active-class="border-b-4 border-gray-500"
            class="text-base font-semibold mx-5 hover:text-yellow-400"
          >
            聯繫我們
          </router-link>
        </div>
      </div>
      <div class="z-10 hidden sm:block flex-none w-68">
        <router-link
          v-if="!isLoggedIn"
          :to="{ name: 'Login' }"
          class="px-4 py-2 border-2 rounded"
        >
          登入
        </router-link>
        <div v-if="isLoggedIn" class="flex items-center justify-end">
          <!-- <CartIcon class="w-9 h-9 mx-3" /> -->
          <div class="dropdown inline-block relative">
            <button
              aria-haspopup="true"
              class="
              bg-white flex text-sm rounded-full focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-white
          "
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full object-cover"
                :src="user.avatar"
                alt="Avatar"
              />
              <!-- <img
              class="h-8 w-8 rounded-full object-cover"
              :src="user.avatar || 'https://caat.thu.edu.tw/wp-content/uploads/avatar-icon.png'"
              alt="Avatar"
            /> -->
            </button>

            <ul
              class="text-sm dropdown-menu absolute mt-8 top-0 right-0 hidden text-gray-700 pt-1 w-28"
            >
              <li class="">
                <div
                  class="rounded-t bg-gray-300 border-b py-2 border-gray-400 px-4 block whitespace-no-wrap"
                >
                  嗨，{{ user.name }}
                </div>
              </li>
              <li class="">
                <router-link
                  :to="{ name: 'Dashboard' }"
                  class=" bg-gray-200 hover:bg-yellow-200 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  控制台
                </router-link>
              </li>
              <li class="">
                <router-link
                  v-if="isLoggedIn && isArtist"
                  :to="{ name: 'Sell' }"
                  class="bg-gray-200 hover:bg-yellow-200 py-2 px-4 block whitespace-no-wrap"
                >
                  刊登拍賣
                </router-link>
              </li>
              <!-- <li class="">
              <router-link
                :to="{ name: 'UserProfile' }"
                class="bg-gray-200 hover:bg-yellow-200 py-2 px-4 block whitespace-no-wrap"
              >
                個人資訊
              </router-link>
            </li> -->
              <li class="">
                <div
                  class="cursor-pointer rounded-b bg-gray-200 hover:bg-yellow-200
                      py-2 px-4 block whitespace-no-wrap"
                  @click="logout"
                >
                  登出
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { authComputed } from '@/store/helpers';
// import CartIcon from './icons/CartIcon.vue';

export default {
  name: 'Navbar',
  // components: { CartIcon },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    ...authComputed,
    ...mapState('user', ['user']),
  },
  methods: {
    toggleMenu() {
      console.log('toggle menu');
      this.isMenuOpen = !this.isMenuOpen;
      console.log('isMenuOpen:', this.isMenuOpen);
    },
    logout() {
      // console.log('logout');
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  // padding: 30px;

  a {
    // font-weight: bold;
    // color: #2c3e50;

    &.router-link-exact-active {
      // color: dimgray;
      // border-bottom: 3px solid #f6e059;
      // border-bottom: 3px solid #ccc;
      // color: #42b983;
    }
  }
}

.dropdown:hover .dropdown-menu {
  display: block;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
