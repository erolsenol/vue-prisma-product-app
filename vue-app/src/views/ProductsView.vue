<template>
  <div class="container">
    Products
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header/Index.vue"

// import { categoryType } from "@/views/CategoriesView.vue"

export interface productType {
  id: number
  name: string
  picture: string
}

interface tableType {
  headers: string[]
  items: productType[]
  products: object[],
  // category: categoryType
}
</script>
