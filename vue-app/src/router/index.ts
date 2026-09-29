import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import DefaultLayout from "@/layout/Default.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/CategoriesView.vue"),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue"),
    meta: {
      layout: DefaultLayout,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
