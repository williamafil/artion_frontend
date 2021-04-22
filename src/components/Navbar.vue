<template>
  <header
    class="z-50 w-full h-16 z-thousand sticky top-0 relative px-5 py-3 flex justify-between
          items-center bg-gray-100"
  >
    <div class="absolute inset-0 shadow-lg opacity-50"></div>
    <div class="flex">
      <button class="h-8 w-8 sm:hidden">
        <svg
          class="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          view-box="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="{1.5}"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div class="z-10 hidden sm:block flex-none w-16">
      <router-link :to="{name: 'Home'}" class="text-base mx-5">
        <h1 class="font-lora text-2xl font-extrabold">artion</h1>
      </router-link>
    </div>
    <div class="z-10 hidden sm:block flex-grow">
      <div class="flex justify-center">
        <router-link to="/bid" class="text-base mx-5">競標</router-link>
        <router-link to="/artists" class="text-base mx-5">藝術家</router-link>
        <router-link to="/exhibitions" class="text-base mx-5">精選展覽</router-link>
        <router-link to="/about" class="text-base mx-5">關於我們</router-link>
        <router-link to="/test" class="text-base mx-5">聯繫我們</router-link>
      </div>
    </div>
    <div class="z-10 hidden sm:block flex-none w-68">
      <router-link v-if="!isLoggedIn" :to="{ name: 'Login' }" class="px-4 py-2 border-2">
        登入
      </router-link>
      <div v-if="isLoggedIn" class="flex items-center justify-end">
        <CartIcon class="w-9 h-9 mx-3" />
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
              :src="user.avatar || 'https://caat.thu.edu.tw/wp-content/uploads/avatar-icon.png'"
              alt="Avatar"
            />
            <!-- <img
              class="h-8 w-8 rounded-full object-cover"
              :src="avatarUrl || 'https://caat.thu.edu.tw/wp-content/uploads/avatar-icon.png'"
              alt="Avatar"
            /> -->
          </button>

          <ul class="dropdown-menu absolute mt-8 top-0 right-0 hidden text-gray-700 pt-1 w-28">
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >控制台</a
              >
            </li>
            <li class="">
              <router-link
                :to="{ name: 'UserProfile' }"
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                <!-- <a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#"> -->
                個人資訊
              </router-link>
              <!-- </a> -->
            </li>
            <li class="">
              <div
                class="cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400
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
</template>

<script>
import { mapState } from 'vuex';
import { authComputed } from '@/store/helpers';
import CartIcon from './icons/CartIcon.vue';

export default {
  name: 'Navbar',
  components: { CartIcon },
  computed: {
    ...authComputed,
    ...mapState('user', ['user']),
  },
  methods: {
    logout() {
      console.log('logout');
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
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: dimgray;
      border-bottom: 3px solid #f6e059;
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
