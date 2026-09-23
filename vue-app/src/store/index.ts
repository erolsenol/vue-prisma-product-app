import { createStore } from "vuex"
import api from "@/service"

import { toastType, stateType } from "@/types"
import axios from "axios"

const store = createStore({
  state: <stateType>{
    products: [],
    categories: [],
    toastItems: [],
    isLoading: false,
    error: null,
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
    setLoading(state, value: boolean) {
      state.isLoading = value
    },
    setError(state, message: string | null) {
      state.error = message
    },
  },
  actions: {
    async initData({ dispatch, commit }) {
      commit("setLoading", true)
      commit("setError", null)
      try {
        await Promise.all([dispatch("listCategories"), dispatch("listProducts")])
      } finally {
        commit("setLoading", false)
      }
    },
    async listCategories({ commit }) {
      try {
        const response = await api.get("/api/categories")
        if (response.status === 200) commit("setCategories", response.data.data)
      } catch (error) {
        commit("setError", getApiErrorMessage(error))
        throw error
      }
    },
    async listProducts({ commit }) {
      try {
        const response = await api.get("/api/products")
        if (response.status === 200) commit("setProducts", response.data.data)
      } catch (error) {
        commit("setError", getApiErrorMessage(error))
        throw error
      }
    },
  },
  modules: {},
})

function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === "string") return message
  }

  return "Unable to load application data"
}

export default store
