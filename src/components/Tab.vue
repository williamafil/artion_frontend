<template>
  <div v-if="isSelected" class="border-t-2 border-gray-100">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped></style>
