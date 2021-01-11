<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-center">
          Product
        </th>
        <th class="text-center">
          Price
        </th>
        <th class="text-center">
          Count
        </th>
        <th class="text-center">
          +/-/x
        </th>
      </tr>
      </thead>
      <tbody>
      <product-row
        v-for="product in cartProducts"
        :key="product.productInfo.id"
        :id="product.productInfo.id"
        :image="product.productInfo.image"
        :price="product.productInfo.price"
        :quantity="product.quantity"
      />
      <tr>
        <td
          colspan="3"
          style="font-size: 1.2em"
          class="text-center grey darken-3">
          Price
        </td>
        <td
          style="font-size: 1.2em"
          class="text-center grey darken-2 font-weight-bold">
          {{ finalPrice }}
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import ProductRow from '@/views/Products/ProductRow';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductTable',
  components: {
    ProductRow,
  },
  mounted() {
    this.getProductList();
  },
  computed: {
    ...mapState([
      'cartProducts',
    ]),
    ...mapGetters([
      'finalPrice',
    ]),
  },
  methods: {
    ...mapActions({
      getProductList: 'getProductList',
    }),
  },
};
</script>

<style scoped>

</style>
