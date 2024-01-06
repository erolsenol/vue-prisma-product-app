import { createStore } from "vuex"
import api from "@/service"

import { toastType, stateType } from "@/types"

const store = createStore({
  state: <stateType>{
    products: [],
    categories: [],
    toastItems: [],
  },
  getters: {
    getToast(state) {
      return state.toastItems
    },
    getProducts(state) {
      return state.products
    },
    getCategories(state) {
      return state.categories
    },
  },
  mutations: {
    addToast(state, data: toastType) {
      state.toastItems.push(data)
      setTimeout(() => state.toastItems.splice(0, 1), 4000)
    },
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

export default store
