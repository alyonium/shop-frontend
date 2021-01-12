<template>
  <v-app>
    <v-main>
      <router-link to="/">
      <v-btn
        fab
        class="ml-sm-5 mt-sm-5 ml-1 mt-2 v-btn--fixed"
      >
          <img
            width="40"
            height="40"
            src="../src/assets/logo.png"
            alt="logo">
      </v-btn>
      </router-link>
      <cart v-if="isCartButton"/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Cart from '@/components/Cart';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Cart,
  },
  computed: {
    ...mapState([
      'isCartButton',
    ]),
  },
};
</script>

<style lang="scss">
.v-card {
  background-color: #ffccbc !important;
}
a {
  text-decoration: none;
}
</style>
