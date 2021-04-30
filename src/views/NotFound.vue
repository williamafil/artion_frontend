<template>
  <div class="gradient text-white min-h-screen flex items-center">
    <div class="container mx-auto p-4 flex flex-wrap items-center">
      <div class="w-full md:w-5/12 text-center p-4">
        <img src="https://themichailov.com/img/not-found.svg" alt="Not Found" />
      </div>
      <div class="w-full md:w-7/12 text-center md:text-left p-4 text-gray-500 ">
        <div class="text-6xl font-medium">404</div>
        <div class="text-xl md:text-3xl font-medium mb-4">
          找不到指定的頁面！
        </div>
        <div class="text-md mb-8 text-gray-400">
          您可能打錯網址了或者是頁面路徑可能已經更改。
        </div>
        <router-link
          :to="{ name: 'Home' }"
          class="border border-white rounded p-3 hover:text-gray-800 hover:bg-gray-300"
        >
          回到首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.gradient {
  //   background-image: linear-gradient(135deg, #684ca0 35%, #1c4ca0 100%);
  background: rgb(227,227,227);
background: radial-gradient(circle, rgba(227,227,227,1) 0%, rgba(255,255,255,1) 70%);
}
</style>
