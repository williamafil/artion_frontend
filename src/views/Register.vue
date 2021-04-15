<template>
  <!-- Container -->
  <div class="container mx-auto">
    <div class="flex justify-center px-6 my-12">
      <!-- Row -->
      <div class="w-full xl:w-3/4 lg:w-11/12 flex">
        <!-- Col -->
        <div
          class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
          style="background-image: url('https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=977&q=80')"
        ></div>
        <!-- Col -->
        <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
          <h3 class="pt-4 text-2xl text-center">註冊帳號</h3>

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
                <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                  姓
                </label>
                <input
                  v-model="lastname"
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700
                        border rounded shadow appearance-none
                        focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                  名
                </label>
                <input
                  v-model="firstname"
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700
                        border rounded shadow appearance-none
                        focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                Email
              </label>
              <input
                v-model="email"
                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700
                      border rounded shadow appearance-none
                      focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div class="mb-4 md:flex md:justify-between">
              <div class="mb-4 md:mr-2 md:mb-0">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                  Password
                </label>
                <input
                  v-model="password"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700
                        border border-red-0 rounded shadow appearance-none
                        focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                />
                <!-- <p class="text-xs italic text-red-500">Please choose a password.</p> -->
              </div>
              <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                  Confirm Password
                </label>
                <input
                  v-model="passwordConfirmation"
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700
                        border rounded shadow appearance-none
                        focus:outline-none focus:shadow-outline"
                  id="c_password"
                  type="password"
                />
              </div>
            </div>
            <div class="mb-6 text-center">
              <button
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                註冊
              </button>
            </div>
            <hr class="mb-6 border-t" />
            <div class="text-center">
              <a
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div class="text-center">
              <a
                class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="./index.html"
              >
                Already have an account? Login!
              </a>
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
      console.log('register');
      this.$store
        .dispatch('signup', {
          name: this.lastname + this.firstname,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        .then(() => {
          this.$router.push({ name: 'Dashboard' });
        })
        .catch((err) => {
          // console.log('錯誤: ', err.response);
          // console.log('錯誤: ', err.response.data.errors);
          // console.log('錯誤: ', err.response);
          console.log('錯誤: ', err.response.data);
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
