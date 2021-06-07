<template>
  <div>
    <NotificationContainer class="z-50" />
    <div id="nav">
      <Navbar />
    </div>
    <div id="content">
      <router-view />
    </div>
    <div id="footer" class="">
      <Footer />
    </div>
  </div>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NotificationContainer,
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss"></style>
