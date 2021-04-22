<template>
  <footer class="w-full h-80 sticky border-t-2 bg-gray-100">
    <div class="container h-full mx-auto flex">
      <section class="p-10 w-2/6 flex flex-col justify-start items-end">
        <h2 class="mr-20 text-3xl font-black tracking-wide">artion</h2>
      </section>
      <section class="p-10 w-4/6 flex">
        <div class="h-full w-1/3">
          <ul class="text-left">
            <li class="mb-4 text-sm font-semibold">競標</li>
            <li class="my-4 text-sm font-semibold">藝術家</li>
            <li class="my-4 text-sm font-semibold">精選展覽</li>
            <li class="my-4 text-sm font-semibold">關於我們</li>
            <li class="my-4 text-sm font-semibold">運送及付款</li>
            <li class="my-4 text-sm font-semibold">聯繫我們</li>
          </ul>
        </div>
        <div class="h-full w-1/3">
          <ul class="text-left">
            <li class="mb-4 text-sm font-semibold">如何競標</li>
            <li class="my-4 text-sm font-semibold">如何拍賣</li>
            <li class="my-4 text-sm font-semibold">Privacy Policy</li>
            <li class="my-4 text-sm font-semibold">Terms</li>
          </ul>
        </div>
        <div class="flex flex-col h-full w-1/3 text-left">
          <label class="mb-2 text-sm">訂閱最新消息</label>
          <input type="text" class="mb-2 h-10 p-2 border rounded-md" placeholder="e-mail" />
          <button class="self-end border-2 w-16 p-1 text-sm">訂閱</button>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped></style>
