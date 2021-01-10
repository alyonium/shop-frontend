<template>
  <v-app>
    <v-main>
      <v-btn
        fab
        class="ml-5 mt-5 v-btn--fixed"
      >
          <img
            width="40"
            height="40"
            src="../src/assets/logo.png"
            alt="logo">
      </v-btn>
      <products-list/>
    </v-main>
  </v-app>
</template>

<script>
import ProductsList from '@/views/Products/ProductsList';

export default {
  name: 'App',
  components: {
    ProductsList,
  },
};
</script>
