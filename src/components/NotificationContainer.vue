<template>
  <div class="fixed pr-4 bottom-10 right-4">
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
