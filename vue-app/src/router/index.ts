import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import DefaultLayout from "@/layout/Default.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/categories",
    name: "categories",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CategoriesView.vue"),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductsView.vue"),
    meta: {
      layout: DefaultLayout,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
