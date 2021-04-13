<template>
  <!-- Root element for center items -->
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Auth Card Container -->
    <div class="grid place-items-center mx-2 my-20">
      <!-- Auth Card -->
      <div
        class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
            px-6 py-10 sm:px-10 sm:py-6
            bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <!-- Card Title -->
        <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          登入
        </h2>

        <form class="mt-10" @submit.prevent="login">
          <!-- Email Input -->
          <label for="email" class="block text-xs font-semibold text-gray-600 uppercase"
            >E-mail</label
          >
          <input
            id="email"
            type="email"
            name="email"
            v-model="email"
            placeholder="e-mail address"
            autocomplete="email"
            class="block w-full py-3 px-3 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
            autofocus
          />

          <!-- Password Input -->
          <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >密碼</label
          >
          <input
            id="password"
            type="password"
            name="password"
            v-model="password"
            placeholder="password"
            autocomplete="current-password"
            class="block w-full py-3 px-3 mt-2 mb-4
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />
          <div class="h-5">
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <!-- Auth Buttton -->
          <button
            type="submit"
            class="w-full py-3 mt-6 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            登入
          </button>

          <!-- Another Auth Routes -->
          <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <a href="forgot-password" class="flex-2 underline">
              忘記密碼?
            </a>

            <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
              or
            </p>
            <a href="register" class="flex-2 underline">
              建立帳號
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    login() {
      console.log('login');
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Dashboard' });
        })
        .catch((error) => {
          console.log('錯誤: ', error);
          console.log('錯誤: ', error.response.data.error);
          this.error = error.response.data.error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
