<template>
  <div>
    <v-btn
      v-if="getFinalPrice"
      @click.stop="drawer = !drawer"
      fab
      class="mr-sm-5 mt-sm-5 mr-1 mt-2 v-btn--fixed cart-button"
    >
      <img
        width="40"
        height="40"
        src="../assets/cart.png"
        alt="logo">
    </v-btn>
    <v-navigation-drawer
      fixed
      permanent
      right
      width="600"
      v-if="drawer"
      temporary
    >
      <v-btn
        x-small
        text
        class="ml-2 mt-2 font-weight-bold"
        @click="drawer = !drawer"
      >
      close
      </v-btn>
        <v-list-item
        class="justify-center">
          <h2>Cart</h2>
        </v-list-item>
      <v-list
        v-if="getFinalPrice"
        class="pt-0">
        <products-table/>
        <v-item-group
          class="d-flex justify-center mt-5">
          <router-link to="/checkout">
            <v-btn
              class="ml-2 mr-2"
              @click="buyProducts"
            >
              Checkout
            </v-btn>
          </router-link>
          <v-btn
            class="ml-2 mr-2"
            color="deep-orange lighten-2"
            @click="resetCart"
          >
            Reset
          </v-btn>
        </v-item-group>
      </v-list>
      <v-list
        class="d-flex justify-center align-center empty-message"
        v-else>
        Cart is empty
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ProductsTable from '@/views/Products/ProductsTable/ProductsTable';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'Cart',
  components: {
    ProductsTable,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapState([
      'cartProducts',
    ]),
    ...mapGetters([
      'getFinalPrice',
    ]),
  },
  methods: {
    ...mapMutations({
      resetCartProducts: 'resetCartProducts',
    }),
    resetCart() {
      this.resetCartProducts();
    },
    buyProducts() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped lang="scss">
.cart-button {
  right: 0;
  position: fixed;
}
.empty-message {
  height: calc(100vh - 80px);
}
</style>
