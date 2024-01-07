<template>
  <div class="page-content products">
    <div class="page-content-title pt-2 ps-2 d-flex justify-content-between align-items-center">
      <p class="fs-4 text-start mb-0">{{ $t('products') }}</p>
      <div class="page-content-action">
        <button type="button" class="btn btn-outline-primary me-3" data-bs-toggle="modal" data-bs-target="#common-modal"
          @click="showModal('create', -1)">{{
            $t('add') }}</button>
      </div>
    </div>

    <div class="border-top my-2"></div>
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
            <td>
              <img v-if="item.picture" :src="item.picture" class="img-thumbnail">
            </td>
            <td>{{ item.id }}</td>
            <td>{{ item.category.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-footer d-flex flex-row mt-0 align-items-center justify-content-end">
      <Pagination v-model="pagination" @selectPage="getItems" />
    </div>
    <CommonModal :title="`${$t('product')} ${formType}`" :footer="false" :style="{ textAlign: 'left' }">
      <template v-slot:content>
        <ProductForm :type="formType" v-model="product" @fileInput="fileInput" />
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

<script setup lang="ts" generic="ProductsView extends Vue">
import { Vue } from "vue-class-component"
import { ref, reactive, onMounted, defineOptions } from "vue";
import { useI18n } from "vue-i18n"
import { useStore } from "vuex";

import Pagination from "@/components/Pagination.vue"
import ProductForm from "@/components/Product/Form.vue"
import CommonModal from "@/components/CommonModal.vue"

import api from "@/service";
import { productType, paginationType, tableType } from "@/types"

defineOptions({
  name: 'ProductsView',
  components: { Pagination, ProductForm, CommonModal },
})

const { t } = useI18n()
const store = useStore()

const productPictureEl = ref(null)
let pagination = ref<paginationType>({})
let formType = ref<(string)>("create")
let product = ref<productType>({})
let table = reactive<tableType>({
  items: [],
  headers: ['actions', 'id', 'name', 'picture', 'category'],
  actions: [{ text: 'update', func: itemAction }, { text: 'delete', func: itemAction }]
})

let picture = ref<Blob | null>();
let pictureName = ref<string>("");

function fileInput(file: File) {
  const reader = new FileReader();
  reader.addEventListener('load', readFile);
  reader.readAsDataURL(file);

  pictureName.value = file.name

}
function readFile(event) {
  picture.value = event.target.result;
}

async function itemAction() {
  const data = {
    ...product.value,
    picture: picture.value,
    picture_name: pictureName.value
  }

  
  const categoryId = product?.value?.category_id
  if (typeof categoryId !== "number" && categoryId.includes("-")) {
    const parenIdArr = product.value.category_id.split("-")
    data.category_id = Number(parenIdArr[0])
  }

  try {
    let response
    switch (formType.value) {
      case "create":
        response = await api.post("/api/products", data)
        break;
      case "update":
        response = await api.put("/api/products/" + data.id, data)
        break;
      case "delete":
        response = await api.delete("/api/products/" + data.id)
        break;

      default:
        break;
    }

    if (response?.status === 200 || response?.status === 201) {
      await getItems()
      product.value = {}
      document.querySelector("#common-modal-close").click()
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      store.commit('addToast', { title: t('error'), text: error.response.data.message })
    }
  }
}

async function showModal(type: string, id: number) {
  product.value = {}
  if (id > -1) {
    await getItem(id)
  }
  formType.value = type
}

async function getItem(id: number) {
  const response = await api.get("/api/products/" + id)
  if (response.status === 200) {
    product.value = response.data.data
  }
}
onMounted(async () => {
  await getItems()
})

async function getItems(page = 1, limit = 20) {
  const response = await api.get(`/api/products?page=${page}&limit=${limit}`)
  if (response.status === 200) {
    table.items = response.data.data
    pagination.value = response.data.pagination
  }
}

</script>

<style scoped lang="scss"></style>