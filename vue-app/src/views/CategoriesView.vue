<template>
  <div class="page-content categories">
    <p class="page-content-title fs-4 text-start">{{ $t('categories') }}</p>
    <div class="border-top my-3"></div>
    <div class="page-table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" v-for="(header, index) in table.headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in table.items" :key="index">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.picture }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.products.lenght }}</td>
            <td>{{ item.parent_category?.name }}</td>
            <td>{{ item.child_category.lenght }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination />
  </div>
</template>

<script setup lang="ts" generic="CategoriesView extends Vue">
import { Vue } from "vue-class-component"
import { reactive, inject, onMounted, defineOptions } from "vue";
import { AxiosInstance } from "axios"

import { productType } from "@/views/ProductsView.vue"
import Pagination from "@/components/Pagination.vue"

defineOptions({
  name: 'CategoriesView',
  components: { Pagination },
})


const api: AxiosInstance = inject('api')

interface categoryType {
  id: number
  name: string
  picture: string
}
interface tableType {
  headers: string[]
  items: categoryType[]
  products: productType[],
  parent_category: categoryType
  child_category: categoryType[]
}

let table: tableType = reactive({
  items: [],
  headers: ['id', 'name', 'picture', 'product', 'parent', 'child',]
})

onMounted(async () => {
  const response = await api.get("/api/categories")
  console.log("response", response);
  if (response.status === 200) {
    table.items = response.data.data
  }
})

</script>

<style scoped lang="scss"></style>