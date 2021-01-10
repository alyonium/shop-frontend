<template>
  <v-col
    md="3">
      <v-card
        class="mb-10"
        elevation="8">
          <v-row>
            <v-col
              md="8"
              offset-md="2"
              class="d-flex flex-column align-center">
              <img
                width="150"
                height="150"
                :src="image"
                :alt="title">
              <v-list-item>
                <h2>{{ title }}</h2>
              </v-list-item>
            </v-col>
          </v-row>
        <v-row>
          <v-col
            md="6"
            offset-md="1"
            class="d-flex flex-column justify-center">
            <v-list-item>
              <span>{{ price }}$ per kilo</span>
            </v-list-item>
            <v-list-item
              v-if="isAdded">
              <span>In cart: {{ quantity }}</span>
            </v-list-item>
          </v-col>
          <v-col
            md="3"
            offset-md="1"
          >
            <v-card-actions
              class="d-flex flex-column justify-center"
            >
              <v-btn
                class="mb-2"
                small
                @click="addProduct">
                +
              </v-btn>
              <v-btn
                class="mb-2"
                small
                :disabled="!isAdded"
                @click="removeProduct">
                -
              </v-btn>
              <v-btn
                class="mb-2"
                small
                :disabled="!isAdded"
                @click="resetProduct">
                x
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
  </v-col>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
  name: 'ProductCard',
  props: {
    id: Number,
    image: String,
    title: String,
    price: Number,
  },
  data() {
    return {
      isAdded: false,
      quantity: 0,
    };
  },
  computed: {
    ...mapGetters({
      checkProductInCart: 'checkProductInCart',
    }),
    ...mapState([
      'cartProducts',
    ]),
  },
  methods: {
    ...mapMutations({
      addNewProductToCart: 'addNewProductToCart',
      removeProductFromCart: 'removeProductFromCart',
      increaseProductInCart: 'increaseProductInCart',
      decreaseProductInCart: 'decreaseProductInCart',
    }),
    addProduct() {
      this.quantity += 1;

      if (this.checkProductInCart(this.id)) {
        this.increaseProductInCart(this.id);
      } else {
        this.addNewProductToCart({
          productInfo: {
            id: this.id,
            title: this.title,
            price: this.price,
          },
          quantity: 1,
        });
      }

      this.isAdded = true;
    },
    removeProduct() {
      this.quantity -= 1;

      if (this.quantity > 0) {
        this.decreaseProductInCart(this.id);
      } else {
        const indexOfRemoveProduct = this.cartProducts.indexOf(this.checkProductInCart(this.id));
        this.removeProductFromCart(indexOfRemoveProduct);
        this.isAdded = false;
      }
    },
    resetProduct() {
      this.quantity = 0;
      const indexOfRemoveProduct = this.cartProducts.indexOf(this.checkProductInCart(this.id));
      this.removeProductFromCart(indexOfRemoveProduct);
      this.isAdded = false;
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 0 !important;
}

img {
  object-fit: cover;
}
</style>
