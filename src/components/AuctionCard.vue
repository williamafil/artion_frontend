<template>
  <div class="my-5 px-1 w-full md:w-1/2 md:px-4 lg:my-4 lg:px-4 lg:w-1/3">
    <router-link :to="{ name: 'Auction', params: { id: item.slug } }">
      <div class="mt-2 shadow-xl">
        <article class="overflow-hidden shadow-lg">
          <div class="relative">
            <div class="absolute bottom-4 w-full flex justify-center items-center">
              <div class="flex items-center justify-center h-16 w-32 bg-gray-100 rounded-l-lg">
                2d 23h 57m
              </div>
              <div class="flex items-center justify-center h-16 w-40 bg-gray-200 rounded-r-lg">
                <div class="flex flex-col justify-start ">
                  <label class="leading-4 text-sm font-bold">起標價</label>
                  <h3 class="leading-4 text-lg font-extrabold">
                    {{ item.bidding_price | separator | dollar }}
                  </h3>
                </div>
              </div>
            </div>
            <img
              alt="Placeholder"
              class="block object-cover h-56 w-full rounded-t-md"
              :src="item.images_url[0]"
            />
          </div>
          <header class="flex flex-col items-center justify-between leading-tight p-2 md:p-4">
            <div class="w-full flex justify-between px-10 py-4">
              <h4 class="text-lg font-extrabold">{{ item.user.name }}</h4>
              <h4 class="text-lg font-extrabold">{{ item.genre.name }}</h4>
            </div>
            <div class="text-2xl p-10">
              <img
                alt="quote"
                class="float-left mr-1"
                src="https://assets-global.website-files.com/5b5a66e9f3166b36708705fa/5cf8fb1f994fb7168d0d66fb_quote-intro.svg"
              />
              {{ item.description }}
            </div>
          </header>
        </article>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
