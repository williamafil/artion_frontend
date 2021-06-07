<template>
  <div class="md:h-auto">
    <div class="bg-gray-200 w-full static top-32 md:static md:top-32">
      <!-- <div class="mx-8"> -->
      <div class="">
        <!-- <div class="spacer h-20 md:h-16"></div> -->

        <!-- <div class="relative overflow-hidden h-96">
          <img
            class="opacity-60 absolute left-0 top-0 w-full h-auto"
            src="https://images.unsplash.com/photo-1595944569184-ef0d8e315249?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
            alt=""
          />
          <div class="bg-pink-500 relative top-50 right-0 left-0">
            <h1>Hello World!</h1>
          </div>
        </div> -->

        <div
          class="w-full bg-cover bg-center opacity-70"
          style="height:32rem; background-image: url(https://images.unsplash.com/photo-1595944569184-ef0d8e315249?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)"
        >
          <div class="flex w-3/4 mx-auto relative top-60 z-50">
            <section class="bg-white w-1/2 pl-3">
              <h3 class="my-2 italic text-3xl font-extrabold">愛麗絲·尼爾</h3>
              <h2 class="font-light text-2xl">《人民至上》</h2>
              <h4 class="mt-10 text-xl font-light">線上展覽</h4>
              <ul class="mt-6 text-sm font-semibold">
                <li>2021年4月15日</li>
                <li>2021年5月28日</li>
              </ul>
            </section>
            <section class="bg-white w-1/2">
              <div class="h-96 overflow-hidden">
                <img
                  class="transform scale-125"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/10827/33433/main-image"
                />
              </div>
            </section>
          </div>
        </div>
        <article class="mt-36 container mx-auto px-10 tracking-wide">
          <p class="text-gray-600 mb-8">
            愛麗絲·尼爾（AliceNeel）：《人民至上》是二十年來美國藝術家愛麗絲·尼爾（1900--1984）在紐約進行的首次博物館回顧展。這項雄心勃勃的調查將Neel定位為本世紀最激進的畫家之一，是社會正義的擁護者，他對人本主義原則的長期承諾激發了她的生活以及她的藝術，這一點將在大約一百幅油畫，素描和水彩畫中得到印證。在大都會的調查中。
            <br /><br />
            抗議法西斯主義和種族主義的激進主義者的圖像與大蕭條的貧困受害者的畫作以及西班牙哈林區Neel的鄰居的畫像，來自各行各業的政治組織的領導人，酷兒藝術家和表演者以及紐約全球會員的肖像一起出現散居的人。展覽還重點介紹了尼爾在1930年代的情色水彩畫和粉彩，對母親的描繪以及對裸體人物的繪畫（其中一些人顯然懷孕），這些人的坦率和無禮都是西方藝術史上的先例。
            <br /><br />
            尼爾（Neel）是紐約的長期居民，這座城市是她最忠實的對象。確實，她的全部作品證明了其街道的戲劇性，其建築的魁北克風情，最重要的是，其居民的多樣性，彈性和熱情。尼爾在1950年宣稱：“對我來說，人是第一位。我試圖維護人類的尊嚴和永恆的重要性。”
          </p>
        </article>
        <article class="container mx-auto bg-white">
          <div class="w-full md:w-full pl-10 pt-10  mx-auto">
            <h4 class="ml-3 text-3xl text-gray-800 font-medium mb-3">
              作品
            </h4>

            <ul class="flex justify-center flex-wrap">
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/14931/34215/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/10827/33433/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/438822/796430/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/437512/800400/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/14514/42312/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/488146/1630166/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
            </ul>
          </div>
        </article>
        <!-- <div class="relative"> -->
        <!-- <div class="z-50 absolute -top-60 inset-x-0  w-3/4 md:w-2/5 mx-auto -mt-1"> -->
        <!-- <div class="container flex">
          <div class="w-1/2 ">
            <h3 class="my-2 italic text-3xl font-extrabold">愛麗絲·尼爾</h3>
            <h2 class="font-light text-2xl">《人民至上》</h2>
            <h4 class="mt-10 text-xl font-light">線上展覽</h4>
            <ul class="mt-6 text-sm font-semibold">
              <li>2021年4月15日</li>
              <li>2021年5月28日</li>
            </ul>
          </div>
          <div class="h-96 overflow-hidden">
            <img
              class="transform scale-125"
              src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/10827/33433/main-image"
            />
          </div>
        </div> -->
        <!-- </div> -->
        <!-- <div
          class="w-full opacity-70 bg-cover bg-center relative"
          style="height:32rem; background-image: url(https://images.unsplash.com/photo-1595944569184-ef0d8e315249?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)"
        ></div> -->
        <!-- </div> -->
      </div>
    </div>
    <!-- <div
      class="w-full text-gray-700 bg-blue-200"
      style="font-family: 'Source Sans Pro', sans-serif"
    >
      <div class="mt-96 relative">
        <div class="z-50 absolute -top-60 inset-x-0  w-3/4 md:w-2/5 mx-auto -mt-1">
          <div class="container flex">
            <div class="w-1/2 ">
              <h3 class="my-2 italic text-3xl font-extrabold">愛麗絲·尼爾</h3>
              <h2 class="font-light text-2xl">《人民至上》</h2>
              <h4 class="mt-10 text-xl font-light">線上展覽</h4>
              <ul class="mt-6 text-sm font-semibold">
                <li>2021年4月15日</li>
                <li>2021年5月28日</li>
              </ul>
            </div>
            <div class="h-96 overflow-hidden">
              <img
                class="transform scale-125"
                src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/10827/33433/main-image"
              />
            </div>
          </div>
        </div>
        <div
          class="w-full opacity-70 bg-cover bg-center relative"
          style="height:32rem; background-image: url(https://images.unsplash.com/photo-1595944569184-ef0d8e315249?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)"
        ></div>
      </div>

      <section class="container mx-auto px-6 p-10">
        <div class="flex items-center flex-wrap mb-20">
          <div class="w-full md:w-1/2">
            <p class="text-gray-600 mb-8">
              愛麗絲·尼爾（AliceNeel）：《人民至上》是二十年來美國藝術家愛麗絲·尼爾（1900--1984）在紐約進行的首次博物館回顧展。這項雄心勃勃的調查將Neel定位為本世紀最激進的畫家之一，是社會正義的擁護者，他對人本主義原則的長期承諾激發了她的生活以及她的藝術，這一點將在大約一百幅油畫，素描和水彩畫中得到印證。在大都會的調查中。
              <br /><br />
              抗議法西斯主義和種族主義的激進主義者的圖像與大蕭條的貧困受害者的畫作以及西班牙哈林區Neel的鄰居的畫像，來自各行各業的政治組織的領導人，酷兒藝術家和表演者以及紐約全球會員的肖像一起出現散居的人。展覽還重點介紹了尼爾在1930年代的情色水彩畫和粉彩，對母親的描繪以及對裸體人物的繪畫（其中一些人顯然懷孕），這些人的坦率和無禮都是西方藝術史上的先例。
              <br /><br />
              尼爾（Neel）是紐約的長期居民，這座城市是她最忠實的對象。確實，她的全部作品證明了其街道的戲劇性，其建築的魁北克風情，最重要的是，其居民的多樣性，彈性和熱情。尼爾在1950年宣稱：“對我來說，人是第一位。我試圖維護人類的尊嚴和永恆的重要性。”
            </p>
          </div>
          <div class="w-1/2"></div>
        </div>
        <div class="flex items-center flex-wrap mb-20">
          <div class="w-1/4"></div>
          <div class="w-full md:w-3/4 pl-10">
            <h4 class="ml-3 text-3xl text-gray-800 font-medium mb-3">
              作品
            </h4>

            <ul class="flex flex-wrap">
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/14931/34215/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/10827/33433/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/438822/796430/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/437512/800400/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/14514/42312/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
              <li class="m-4">
                <img
                  class=" w-60"
                  src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/488146/1630166/main-image"
                  alt="image"
                />
                <h4 class="mt-1 text-sm font-extralight">Lenin (Shiva), 1874</h4>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center flex-wrap mb-20">
          <div class="w-full md:w-1/2"></div>
          <div class="w-full md:w-1/2"></div>
        </div>
      </section>
    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
