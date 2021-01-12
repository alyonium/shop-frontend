import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cartProducts: [],
    isCartButton: true,
  },
  getters: {
    checkProductInCart: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct?.productInfo?.id === productId),
    finalPrice: (state) => state.cartProducts
      .reduce((prevValue, cartProduct) => prevValue
        + (cartProduct.productInfo.price * cartProduct.quantity), 0),
    productInCartQuantity: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct?.productInfo?.id === productId)?.quantity || 0,
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
    resetCartProducts(state) {
      state.cartProducts.splice(0, state.cartProducts.length);
    },
    showCartButton(state) {
      state.isCartButton = true;
    },
    dontShowCartButton(state) {
      state.isCartButton = false;
    },
  },
  actions: {
    async getProductList(context) {
      const res = await Vue.axios.get('/getProductsList');
      context.commit('setProductsList', res.data);
    },
  },
});
