import { defineStore } from "pinia"

import api from "@/service"
import { getApiErrorMessage } from "@/service/errors"
import type { categoryType, productType, toastType } from "@/types"

interface AppState {
  products: productType[]
  categories: categoryType[]
  toastItems: toastType[]
  isLoading: boolean
  error: string | null
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    products: [],
    categories: [],
    toastItems: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    addToast(toast: toastType) {
      this.toastItems.push(toast)
      setTimeout(() => {
        const toastIndex = this.toastItems.indexOf(toast)
        if (toastIndex !== -1) this.toastItems.splice(toastIndex, 1)
      }, 4000)
    },
    async initData() {
      this.isLoading = true
      this.error = null
      try {
        await Promise.all([this.listCategories(), this.listProducts()])
      } finally {
        this.isLoading = false
      }
    },
    async listCategories() {
      try {
        const response = await api.get("/api/categories")
        if (response.status === 200) this.categories = response.data.data
      } catch (error: unknown) {
        this.error = getApiErrorMessage(error, "Unable to load application data")
        throw error
      }
    },
    async listProducts() {
      try {
        const response = await api.get("/api/products")
        if (response.status === 200) this.products = response.data.data
      } catch (error: unknown) {
        this.error = getApiErrorMessage(error, "Unable to load application data")
        throw error
      }
    },
  },
})
