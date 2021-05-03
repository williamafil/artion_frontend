<template>
  <div class="container mx-auto">
    <form action="" class="form bg-white p-6 my-10 relative">
      <div class="icon text-white w-6 h-6 absolute flex items-center justify-center p-5" style="left:-40px"><i class="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i></div>
      <h3 class="text-2xl text-gray-900 font-semibold">告訴我們你的想法</h3>
      <p class="text-gray-600">讓我們知道有什麼我們可以幫助到你！</p>
      <div class="flex space-x-5 mt-3">
          <input type="text" name="" id="" placeholder="您的名字" class="border p-2  w-1/2">
          <input type="tel" name="" id="" placeholder="您的電話號碼" class="border p-2 w-1/2">
      </div>
      <input type="email" name="" id="" placeholder="您的 email" class="border p-2 w-full mt-3">
      <textarea name="" id="" cols="10" rows="3" placeholder="Tell us about desired property" class="border p-2 mt-3 w-full"></textarea>
      <p class="font-bold text-sm mt-3">隱私保護聲明 *</p>
      <div class="flex items-baseline space-x-2 mt-2">
          <input type="checkbox" name="" id="" class="inline-block">
          <p class="text-gray-600 text-sm">您在本服務所自主變更之個人資料，並不即時連動已提供第三人所留存的個人資料。</p>
      </div>
      <input type="submit" value="Submit" class="text-gray-900 w-full mt-6 rounded  bg-gray-200 hover:bg-gray-400 font-semibold p-3">

    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

</style>
