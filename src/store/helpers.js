import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('user');

export const authComputed = {
  ...mapGetters(['isLoggedIn', 'isArtist']),
};
