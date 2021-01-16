<template>
  <v-col
    md="3"
    offset-md="0"
    sm="5"
    offset-sm="0"
    cols="8"
    offset="2">
      <v-card
        class="mb-10"
        elevation="8">
          <v-row>
            <v-col
              cols="8"
              offset="2"
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
            cols="6"
            offset="1"
            class="d-flex flex-column justify-center">
            <v-list-item>
              <span>{{ price }}$</span>
            </v-list-item>
            <v-list-item
              v-if="quantity !== 0">
              <span>In cart: {{ quantity }}</span>
            </v-list-item>
          </v-col>
          <v-col
            cols="3"
            offset="1"
          >
            <v-card-actions
              class="d-flex flex-column justify-center"
            >
              <v-btn
                small
                @click="addProduct">
                +
              </v-btn>
              <v-btn
                small
                :disabled="quantity === 0"
                @click="removeProduct">
                -
              </v-btn>
              <v-btn
                small
                :disabled="quantity === 0"
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
  computed: {
    ...mapGetters({
      findProductInCart: 'findProductInCart',
      productInCartQuantity: 'productInCartQuantity',
    }),
    ...mapState([
      'cartProducts',
    ]),
    quantity() {
      return this.productInCartQuantity(this.id);
    },
  },
  methods: {
    ...mapMutations({
      addNewProductToCart: 'addNewProductToCart',
      removeProductFromCart: 'removeProductFromCart',
      increaseProductInCart: 'increaseProductInCart',
      decreaseProductInCart: 'decreaseProductInCart',
    }),
    addProduct() {
      if (this.findProductInCart(this.id)) {
        this.increaseProductInCart(this.id);
      } else {
        this.addNewProductToCart({
          productInfo: {
            id: this.id,
            title: this.title,
            price: this.price,
            image: this.image,
          },
          quantity: 1,
        });
      }
    },
    removeProduct() {
      if (this.productInCartQuantity(this.id) > 1) {
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
button {
  margin-left: 0 !important;
  margin-bottom: 8px;
}

img {
  object-fit: cover;
}

span {
  font-weight: bold;
}

@media (max-width: 961px) and (min-width: 600px) {
  .col-sm-5:nth-child(odd) {
    margin-left: 8.3333333333%;
  }
}
</style>
