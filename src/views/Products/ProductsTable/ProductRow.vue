<template>
  <tr>
    <td class="text-center">
      <img
        width="50"
        height="50"
        :src="image"
        :alt="title"/>
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
      class="text-center d-sm-table-cell d-flex flex-column align-center">
      <v-btn
        class="ml-sm-2 mr-sm-2 mr-0 ml-0"
        @click="addProduct">
        +
      </v-btn>
      <v-btn
        class="ml-sm-2 mr-sm-2 mt-sm-0 mr-0 ml-0 mt-2"
        @click="removeProduct">
        -
      </v-btn>
      <v-btn
        class="ml-sm-2 mr-sm-2 mt-sm-0 mr-0 ml-0 mt-2"
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
      getProductInCart: 'getProductInCart',
      getProductInCartQuantity: 'getProductInCartQuantity',
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
      if (this.getProductInCartQuantity(this.id) > 1) {
        this.decreaseProductInCart(this.id);
      } else {
        this.resetProduct();
      }
    },
    resetProduct() {
      this.removeProductFromCart(this.id);
    },
  },
};
</script>

<style scoped>
img {
  object-fit: cover;
  margin-top: 4px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 8px;
}

@media (max-width: 601px) and (min-width: 300px) {
  td {
    height: 100% !important;
  }

  button {
    width: 64px !important;
  }
}
</style>
