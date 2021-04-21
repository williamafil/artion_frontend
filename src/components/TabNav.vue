<template>
  <div class="w-4/6 flex justify-center items-center p-10 h-full">
    <div class="w-full">
      <div class="flex -mx-px">
        <button
          @click="setTab(tab)"
          :class="{ 'bg-gray-100 border-gray-200': tab === selected }"
          v-for="tab in tabs"
          :key="tab"
          class="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold rounded-t focus:outline-none mx-px py-2 px-4"
          type="button"
        >
          {{ tab }}
        </button>
      </div>
      <slot></slot>
    </div>
    <!--
        <div class="w-1/3">
          <ul class="nav nav-tabs">
            <li v-for="tab in tabs" :key="tab" class="nav-item">
              <a href="nav-link" :class="{ active: tab === selected }" @click="setTab(tab)">
                {{ tab }}
              </a>
            </li>
          </ul>
          <slot></slot>
        </div>
    -->
  </div>
</template>

<script>
export default {
  name: 'TabNav',
  props: {
    /* Holds all of the tabs data */
    tabs: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  methods: {
    setTab(tab) {
      console.log('click: $emit', tab);
      this.$emit('selected', tab);
    },
  },
};
</script>

<style lang="scss" scoped></style>
