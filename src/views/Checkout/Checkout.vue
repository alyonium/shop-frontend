<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="text-center mb-10">
        <h1>Checkout</h1>
      </v-col>
    </v-row>
    <v-list v-if="finalPrice">
      <v-row>
        <order-window v-if="isBuy"/>
        <products-table/>
      </v-row>
      <v-row
        class="d-flex justify-center mt-5">
        <router-link to="/checkout">
          <v-btn
            class="ml-2 mr-2"
            @click="makeOrder"
          >
            Buy
          </v-btn>
        </router-link>
        <v-btn
          class="ml-2 mr-2"
          color="deep-orange lighten-2"
          @click="resetCart"
        >
          Reset
        </v-btn>
      </v-row>
    </v-list>
    <v-list
      class="d-flex justify-center align-center empty-message"
      v-else>
      Cart is empty
    </v-list>
  </v-container>
</template>

<script>
import ProductsTable from '@/views/Products/ProductsTable';
import OrderWindow from '@/components/OrderWindow';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Checkout',
  components: {
    ProductsTable,
    OrderWindow,
  },
  data() {
    return {
      isBuy: false,
    };
  },
  mounted() {
    this.dontShowCartButton();
  },
  computed: {
    ...mapGetters([
      'finalPrice',
    ]),
  },
  methods: {
    ...mapMutations({
      dontShowCartButton: 'dontShowCartButton',
      resetCartProducts: 'resetCartProducts',
    }),
    resetCart() {
      this.resetCartProducts();
    },
    makeOrder() {
      this.isBuy = true;
    },
  },
};
</script>

<style scoped>
.v-data-table {
  width: 100%;
}

.empty-message {
  height: calc(100vh - 120px);
}
</style>
