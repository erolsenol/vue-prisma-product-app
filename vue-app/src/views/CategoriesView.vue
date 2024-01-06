<template>
  <div class="page-content categories">
    <div class="page-content-title d-flex justify-content-between">
      <p class="fs-4 text-start">{{ $t('categories') }}</p>
      <div class="page-content-action">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#common-modal"
          @click="modalOpen('create')">{{
            $t('add') }}</button>
      </div>
    </div>

    <div class="border-top my-3"></div>
    <div class="page-table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" v-for="(header, index) in table.headers" :key="index">{{ t(header) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in table.items" :key="index">
            <th>
              <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                  {{ t('actions') }}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item text-success" href="#">{{ t('update') }}</a></li>
                  <li><a class="dropdown-item text-danger" href="#">{{ t('delete') }}</a></li>
                </ul>
              </div>
            </th>
            <th>{{ item.id }}</th>
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
    <CommonModal :title="`${$t('category')} ${'add'}`" :footer="false" :style="{ textAlign: 'left' }">
      <template v-slot:content>
        <CategoryForm v-model="category" />
      </template>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          {{ $t('close') }}
        </button>
        <button type="button" class="btn btn-primary" @click="itemAction">{{ $t('save') }}</button>
      </template>
    </CommonModal>

  </div>
</template>

<script setup lang="ts" generic="CategoriesView extends Vue">
import { Vue } from "vue-class-component"
import { ref, reactive, onMounted, defineOptions } from "vue";
import { useI18n } from "vue-i18n"
import { useStore } from "vuex";
import { Modal } from "bootstrap";

import { productType } from "@/types"
import Pagination from "@/components/Pagination.vue"
import CategoryForm from "@/components/Category/Form.vue"
import CommonModal from "@/components/CommonModal.vue"

import api from "@/service";
import { categoryType } from "@/types"

defineOptions({
  name: 'CategoriesView',
  components: { Pagination, CategoryForm, CommonModal },
})

const { t } = useI18n()
const store = useStore()

interface tableType {
  headers: string[]
  items: categoryType[]
  products: productType[],
  parent_category: categoryType
  child_category: categoryType[]
}

let formType = ref<(string)>("")
let category = ref<(categoryType)>({
  id: 0,
  name: "",
  picture: ""
})
let table: tableType = reactive({
  items: [],
  headers: ['actions', 'id', 'name', 'picture', 'product', 'parent', 'child',],
  actions: [{ text: 'update', func: itemAction }, { text: 'delete', func: itemAction }]
})
let formData = reactive({ type: "", id: 0 })

async function itemAction() {
  const data = {
    ...category.value,
  }
  
  if (category.value.parent_id && category.value.parent_id.includes("-")) {
    const parenIdArr = category.value.parent_id.split("-")
    data.parent_id = Number(parenIdArr[0])
  }

  try {
    let response
    switch (formType.value) {
      case "create":
        response = await api.post("/api/categories", data)
        break;

      default:
        break;
    }

    if (response?.status === 200 || response?.status === 201) {
      document.querySelector("#common-modal-close").click()
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      store.commit('addToast', { title: t('error'), text: error.response.data.message })
    }
    console.log("error", error);
  }
}

function modalOpen(type: string) {
  formType.value = type
}
onMounted(async () => {

  const response = await api.get("/api/categories")
  if (response.status === 200) {
    table.items = response.data.data
  }
})

</script>

<style scoped lang="scss"></style>