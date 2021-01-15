<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="text-center mb-10">
        <h1>Checkout</h1>
      </v-col>
    </v-row>
    <v-list v-if="isBuy">
      <v-row>
        <order-window/>
      </v-row>
    </v-list>
    <v-list v-if="finalPrice">
      <v-row>
        <products-table/>
      </v-row>
      <v-row
        class="d-flex justify-center mt-5">
        <router-link to="/checkout">
          <v-btn
            class="ml-2 mr-2"
            @click="buyProducts"
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
import { mapGetters, mapMutations, mapActions } from 'vuex';

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
  computed: {
    ...mapGetters([
      'finalPrice',
    ]),
  },
  methods: {
    ...mapMutations({
      resetCartProducts: 'resetCartProducts',
    }),
    ...mapActions({
      makeOrder: 'makeOrder',
    }),
    resetCart() {
      this.resetCartProducts();
    },
    async buyProducts() {
      await this.makeOrder();
      this.isBuy = true;
      this.resetCart();
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
