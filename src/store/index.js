import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cartProducts: [],
  },
  getters: {
    findProductInCart: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct.productInfo.id === productId),
    finalPrice: (state) => state.cartProducts
      .reduce((prevValue, cartProduct) => prevValue
        + (cartProduct.productInfo.price * cartProduct.quantity), 0),
    productInCartQuantity: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct.productInfo.id === productId)?.quantity || 0,
  },
  mutations: {
    setProductsList(state, productsList) {
      state.products = [...productsList];
    },
    addNewProductToCart(state, product) {
      state.cartProducts.push(product);
    },
    removeProductFromCart(state, productId) {
      const productIndex = state.cartProducts
        .findIndex((product) => product.productInfo.id === productId);
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
  },
  actions: {
    async getProductList({ commit }) {
      const res = await Vue.axios.get('/getProductsList');
      commit('setProductsList', res.data);
    },
    async makeOrder({ state, getters }) {
      const date = Date.now();
      await Vue.axios.post('/makeOrder', {
        summary: getters.finalPrice,
        date,
        product: state.cartProducts.map((product) => ({
          title: product.productInfo.title,
          quantity: product.quantity,
        })),
      });
    },

  },
  plugins: [createPersistedState()],
});
