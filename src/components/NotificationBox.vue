<template>
  <div
    class="mt-1 mb-4 mx-2 relative cursor-pointer"
    :class="notificationTypeClasss"
    @click="close"
  >
    <div class="text-gray-600 absolute top-2 right-2">
      <Close class="text-2xl" />
    </div>
    {{ notification.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Close from '@/components/icons/Close.vue';

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  components: {
    Close,
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove_notification(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions('notification', ['remove_notification']),
    close() {
      // console.log('close btn clicked');
      this.remove_notification(this.notification);
    },
  },
  computed: {
    notificationTypeClasss() {
      const expr = this.notification.type;
      switch (expr) {
        case 'SUCCESS':
          return 'px-4 pr-8 py-2 rounded bg-white border-2 border-green-100 shadow-md';
        case 'ERROR':
          return 'px-4 pr-8 py-2 rounded bg-white border-2 border-red-100 shadow-md';
        default:
          return 'px-4 pr-8 py-2 rounded bg-white border-2 border-gray-100 shadow-md';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
