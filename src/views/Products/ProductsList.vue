<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        class="text-center mb-10">
        <h1>Products</h1>
      </v-col>
    </v-row>
    <v-row>
        <productCard
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :image="product.image"
          :title="product.title"
          :price="product.price"/>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '@/views/Products/ProductCard';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductsList',
  components: {
    ProductCard,
  },
  mounted() {
    this.setProductList();
  },
  computed: {
    ...mapState([
      'products',
    ]),
  },
  methods: {
    ...mapActions({
      setProductList: 'setProductList',
    }),
  },
};
</script>
