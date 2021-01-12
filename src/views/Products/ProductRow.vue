<template>
  <tr>
    <td class="d-flex align-center justify-center">
      <img
        width="40"
        height="40"
        :src="image"
        :alt="title">
    </td>
    <td
      class="text-center">
      {{ price }}$
    </td>
    <td
      class="text-center">
      {{ quantity }}
    </td>
    <td
      class="text-center">
      <v-btn
        class="ml-2 mr-2"
        @click="addProduct">
        +
      </v-btn>
      <v-btn
        class="ml-2 mr-2"
        @click="removeProduct">
        -
      </v-btn>
      <v-btn
        class="ml-2 mr-2"
        @click="resetProduct">
        x
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'ProductRow',
  props: {
    id: Number,
    image: String,
    title: String,
    price: Number,
    quantity: Number,
  },
  computed: {
    ...mapGetters({
      checkProductInCart: 'checkProductInCart',
      productInCartQuantity: 'productInCartQuantity',
    }),
    ...mapState([
      'cartProducts',
    ]),
  },
  methods: {
    ...mapMutations({
      removeProductFromCart: 'removeProductFromCart',
      increaseProductInCart: 'increaseProductInCart',
      decreaseProductInCart: 'decreaseProductInCart',
    }),
    addProduct() {
      this.increaseProductInCart(this.id);
    },
    removeProduct() {
      if (this.productInCartQuantity(this.id) > 1) {
        this.decreaseProductInCart(this.id);
      } else {
        this.resetProduct();
      }
    },
    resetProduct() {
      const indexOfRemoveProduct = this.cartProducts.indexOf(this.checkProductInCart(this.id));
      this.removeProductFromCart(indexOfRemoveProduct);
    },
  },
};
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
