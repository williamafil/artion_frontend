<template>
  <div class="h-full mb-10">
    <div class="max-w-3xl mx-auto px-4 py-10">
      <div>
        <!-- Step Content -->
        <div class="py-10">
          <div x-show.transition.in="step === 1">
            <div class="mb-5 text-center">
              <div
                class="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset"
              >
                <img
                  id="image"
                  class="object-cover w-full h-32 rounded-full"
                  :src="user.avatar || 'https://caat.thu.edu.tw/wp-content/uploads/avatar-icon.png'"
                  alt="user's avatar"
                />
              </div>
              <label
                for="fileInput"
                type="button"
                class="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path
                    d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"
                  />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                瀏覽照片
              </label>

              <div class="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
                Click to add profile picture
              </div>

              <input
                name="photo"
                id="fileInput"
                accept="image/*"
                class="hidden"
                type="file"
                @change="onChangeHandler"
              />
              <!-- <input
                name="photo"
                id="fileInput"
                accept="image/*"
                class="hidden"
                type="file"
                @change="
                  let file = document.getElementById('fileInput').files[0];
                  var reader = new FileReader();
                  reader.onload = (e) => (image = e.target.result);
                  reader.readAsDataURL(file);
                "
              /> -->
            </div>
            <div class="mb-5">
              <label for="name" class="font-bold mb-1 text-gray-700 block">會員身份</label>
              <h4
                class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              >
                {{ userRole }}
              </h4>
            </div>
            <form @submit.prevent="submitForm">
              <div class="mb-5">
                <label for="name" class="font-bold mb-1 text-gray-700 block">名稱</label>
                <input
                  type="text"
                  class="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  v-model="name"
                />
              </div>
              <div class="text-center">
                <router-link v-if="!isArtist" :to="{ name: 'RegisterArtist' }">
                  <button type="button" class="mx-2 py-3 px-5 rounded-lg shadow-sm bg-gray-50">
                    登記為藝術家
                  </button>
                </router-link>
                <button type="submit" class="mx-2 py-3 px-5 rounded-lg shadow-sm">
                  更新資料
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- / Step Content -->
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { authComputed } from '@/store/helpers';
import { mapState } from 'vuex';

export default {
  name: 'UserProfile',
  data() {
    return {
      name: '',
    };
  },
  created() {
    this.name = this.user.name;
  },
  methods: {
    onChangeHandler(e) {
      // console.log('upload file: ', e);
      // console.log('img: ', e.target.files[0]);
      // console.log('user_id: ', this.user.id);
      const formData = new FormData();
      formData.append('user_id', this.user.id);
      formData.append('avatar', e.target.files[0]);
      // uploadHandler(userId, formData, tokenHeader);

      // console.log('formData', formData);
      this.$store.dispatch('user/uploadAvatar', formData);
    },
    submitForm() {
      // console.log('submit form:', this.name);
      this.$store
        .dispatch('user/updateNameField', {
          name: this.name,
        })
        .then(() => {
          // console.log('更新成功');
        })
        .catch((error) => error);
    },
  },
  computed: {
    ...mapState('user', ['user']),
    ...authComputed,
    userRole() {
      return this.isArtist ? '藝術家' : '一般會員';
    },
  },
};
</script>

<style scoped>
[x-cloak] {
  display: none;
}

[type='checkbox'] {
  box-sizing: border-box;
  padding: 0;
}

.form-checkbox,
.form-radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  color: currentColor;
  background-color: #fff;
  border-color: #e2e8f0;
  border-width: 1px;
  height: 1.4em;
  width: 1.4em;
}

.form-checkbox {
  border-radius: 0.25rem;
}

.form-radio {
  border-radius: 50%;
}

.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.form-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
