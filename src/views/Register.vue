<template>
  <!-- Container -->
  <div class="bg-gray-100 py-12">
    <div class="flex justify-center px-6">
      <!-- Row -->
      <div class="w-full xl:w-3/4 lg:w-11/12 flex bg-white rounded-lg shadow-md lg:shadow-lg">
        <!-- Col -->
        <div
          class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
          style="background-image: url('https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=977&q=80')"
        ></div>
        <!-- Col -->
        <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
          <!-- <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none"> -->
          <h2 class="text-center font-semibold text-3xl lg:text-3xl text-gray-800">註冊帳號</h2>

          <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" @submit.prevent="register">
            <div v-if="this.errors" class="mb-4">
              <ul>
                <li
                  class="list-disc list-inside text-red-600"
                  v-for="(value, name, index) in errors"
                  :key="index"
                >
                  {{ name }} {{ value[0] }}
                </li>
              </ul>
            </div>

            <div class="mb-4 md:flex md:justify-between">
              <div class="mb-4 md:mr-2 md:mb-0">
                <label for="email" class="block text-xs font-semibold text-gray-600 uppercase"
                  >姓</label
                >
                <input
                  id="lastName"
                  type="text"
                  name="lastname"
                  v-model="lastname"
                  placeholder="請輸入您的姓"
                  class="block w-full py-3 px-3 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
              <div class="md:ml-2">
                <label for="email" class="block text-xs font-semibold text-gray-600 uppercase"
                  >名</label
                >
                <input
                  id="firstName"
                  type="text"
                  name="lastname"
                  v-model="firstname"
                  placeholder="請輸入您的名字"
                  class="block w-full py-3 px-3 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-xs font-semibold text-gray-600 uppercase"
                >E-mail</label
              >
              <input
                id="email"
                type="email"
                name="email"
                v-model="email"
                placeholder="請輸入您的 e-mail"
                autocomplete="email"
                class="block w-full py-3 px-3 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
                autofocus
              />
            </div>
            <div class="mb-4 md:flex md:justify-between">
              <div class="mb-4 md:mr-2 md:mb-0">
                <label
                  for="password"
                  class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >密碼</label
                >
                <input
                  id="password"
                  type="password"
                  name="password"
                  v-model="password"
                  placeholder="請輸入至少六位數密碼"
                  class="block w-full py-3 px-3 mt-2 mb-4
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
                <!-- <p class="text-xs italic text-red-500">Please choose a password.</p> -->
              </div>
              <div class="md:ml-2">
                <label
                  for="password"
                  class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >密碼驗證</label
                >
                <input
                  id="c_password"
                  type="password"
                  name="password"
                  v-model="passwordConfirmation"
                  placeholder="請重複輸入密碼"
                  class="block w-full py-3 px-3 mt-2 mb-4
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />
              </div>
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full py-3 mt-6 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                type="submit"
              >
                註冊
              </button>
            </div>
            <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <!-- <a href="forgot-password" class="flex-2 underline">
              忘記密碼?
            </a>

            <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
              or
            </p> -->

              <router-link :to="{ name: 'Login' }" class="flex-2 underline">
                登入
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: null,
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch('user/signup', {
          name: this.lastname + this.firstname,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        .then(() => {
          this.$router.push({ name: 'Dashboard' });
        })
        .catch((err) => {
          // console.log('錯誤: ', err.response.data);
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
