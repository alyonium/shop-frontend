import Vue from 'vue';
import Vuex from 'vuex';
import { version } from '../../package.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    version: '',
    products: [],
    cartProducts: [],
  },
  getters: {
    getProductInCart: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct.productInfo.id === productId),
    getFinalPrice: (state) => state.cartProducts
      .reduce((prevValue, cartProduct) => prevValue
        + (cartProduct.productInfo.price * cartProduct.quantity), 0),
    getProductInCartQuantity: (state) => (productId) => state.cartProducts
      .find((cartProduct) => cartProduct.productInfo.id === productId)?.quantity || 0,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store'))),
        );
        if (state.version === version) {
          this.replaceState(
            Object.assign(state, store),
          );
        } else {
          state.version = version;
        }
      }
    },
    setProducts(state, productsList) {
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
    async setProductList({ commit }) {
      const res = await Vue.axios.get('/getProductsList');
      commit('setProducts', res.data);
    },
    async makeOrder({ state, getters }) {
      const date = Date.now();
      await Vue.axios.post('/makeOrder', {
        summary: getters.getFinalPrice,
        date,
        product: state.cartProducts.map((product) => ({
          title: product.productInfo.title,
          quantity: product.quantity,
        })),
      });
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
