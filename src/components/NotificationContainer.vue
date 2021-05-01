<template>
  <div class="fixed pr-4 top-20 right-2">
    <NotificationBox
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBox from '@/components/NotificationBox.vue';
import { mapState } from 'vuex';

export default {
  components: { NotificationBox },
  computed: {
    ...mapState('notification', ['notifications']),
  },
};
</script>

<style lang="scss" scoped>

</style>
