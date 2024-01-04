import { createStore } from "vuex"
import api from "@/service"

export default createStore({
  state: {
    products: [],
    categories: [],
  },
  getters: {
    getProducts(state) {
      return state.products
    },
    getCategories(state) {
      return state.categories
    },
  },
  mutations: {
    setProducts(state, data) {
      state.products = data
    },
    setCategories(state, data) {
      state.categories = data
    },
  },
  actions: {
    async initData({ dispatch }) {
      dispatch("listCategories")
      dispatch("listProducts")
    },
    async listCategories({ commit }) {
      const response = await api.get("/api/categories")
      if (response.status === 200) {
        commit("setCategories", response.data.data)
      }
    },
    async listProducts({ commit }) {
      const response = await api.get("/api/products")
      if (response.status === 200) {
        commit("setProducts", response.data.data)
      }
    },
  },
  modules: {},
})
