<template>
  <div class="page-content categories">
    <div class="page-content-title d-flex justify-content-between">
      <p class="fs-4 text-start">{{ $t('categories') }}</p>
      <div class="page-content-action">
        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#common-modal"
          @click="showModal('create', -1)">{{
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
                  <li><a class="dropdown-item text-primary" data-bs-toggle="modal" data-bs-target="#common-modal"
                      @click="showModal('update', item.id)">{{ t('update') }}</a>
                  </li>
                  <li><a class="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#common-modal"
                      @click="showModal('delete', item.id)">{{ t('delete') }}</a>
                  </li>
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
        <CategoryForm :type="formType" v-model="category" />
      </template>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          {{ $t('close') }}
        </button>
        <button type="button" class="btn" :class="formType === 'delete' ? 'btn-danger' : 'btn-primary'"
          @click="itemAction">{{ $t(formType) }}</button>
      </template>
    </CommonModal>

  </div>
</template>

<script setup lang="ts" generic="CategoriesView extends Vue">
import { Vue } from "vue-class-component"
import { ref, reactive, onMounted, defineOptions } from "vue";
import { useI18n } from "vue-i18n"
import { useStore } from "vuex";

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
      case "update":
        response = await api.put("/api/categories/" + data.id, data)
        break;
        case "delete":
        response = await api.delete("/api/categories/" + data.id)
        break;

      default:
        break;
    }

    if (response?.status === 200 || response?.status === 201) {
      await getItems()
      document.querySelector("#common-modal-close").click()
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      store.commit('addToast', { title: t('error'), text: error.response.data.message })
    }
    console.log("error", error);
  }
}

async function showModal(type: string, id: number) {
  if (id > -1) {
    await getItem(id)
  }
  formType.value = type
}

async function getItem(id: number) {
  const response = await api.get("/api/categories/" + id)
  if (response.status === 200) {
    category.value = response.data.data
  }
}
onMounted(async () => {
  await getItems()
})

async function getItems() {
  const response = await api.get("/api/categories")
  if (response.status === 200) {
    table.items = response.data.data
  }
}

</script>

<style scoped lang="scss"></style>