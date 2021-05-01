<template>
  <div>
    <div id="nav">
      <Navbar />
    </div>
    <div class="h-full">
      <NotificationContainer class="z-50" />
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
