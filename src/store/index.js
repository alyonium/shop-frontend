import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cartProducts: [],
  },
  getters: {
    checkProductInCart: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct?.productInfo?.id === productId),
  },
  mutations: {
    setProductsList(state, productsList) {
      state.products = [...productsList];
    },
    addNewProductToCart(state, product) {
      state.cartProducts.push(product);
    },
    removeProductFromCart(state, productIndex) {
      state.cartProducts.splice(productIndex, 1);
    },
    increaseProductInCart(state, productId) {
      state.cartProducts
        .find((cartProduct) => cartProduct.productInfo.id === productId).quantity += 1;
    },
    decreaseProductInCart(state, productId) {
      state.cartProducts
        .find((cartProduct) => cartProduct.productInfo.id === productId).quantity -= 1;
    },
  },
  actions: {
    async getProductList(context) {
      const res = await Vue.axios.get('/getProductsList');
      context.commit('setProductsList', res.data);
    },
  },
});
