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
    <div v-if="loadError" class="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
      <span>{{ loadError }}</span>
      <button type="button" class="btn btn-link" :disabled="isLoading" @click="getItems()">
        {{ t('retry') }}
      </button>
    </div>
    <div class="page-table" :aria-busy="isLoading">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" v-for="(header, index) in table.headers" :key="index">{{ t(header) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading && !table.items.length">
            <td :colspan="table.headers.length" class="text-center py-4" role="status">{{ t('loading') }}</td>
          </tr>
          <tr v-else-if="!isLoading && !loadError && !table.items.length">
            <td :colspan="table.headers.length" class="text-center py-4 text-body-secondary">{{ t('noProducts') }}</td>
          </tr>
          <template v-else>
          <tr v-for="(item, index) in table.items" :key="item.id ?? index">
            <th>
              <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                  {{ t('actions') }}
                </button>
                <ul class="dropdown-menu">
                  <li><button type="button" class="dropdown-item text-primary" data-bs-toggle="modal" data-bs-target="#common-modal"
                      @click="showModal('update', item.id)">{{ t('update') }}</button>
                  </li>
                  <li><button type="button" class="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#common-modal"
                      @click="showModal('delete', item.id)">{{ t('delete') }}</button>
                  </li>
                </ul>
              </div>
            </th>
            <th>{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td>
              <img v-if="item.picture" :src="item.picture" class="img-thumbnail">
            </td>
            <td>{{ item.category.name }}</td>
          </tr>
          </template>
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
          :disabled="isSaving" @click="itemAction">{{ isSaving ? t('saving') : $t(formType) }}</button>
      </template>
    </CommonModal>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n"
import { useAppStore } from "@/stores/app";

import Pagination from "@/components/Pagination.vue"
import ProductForm from "@/components/Product/Form.vue"
import CommonModal from "@/components/CommonModal.vue"

import api from "@/service";
import { getApiErrorMessage } from "@/service/errors"
import type { productType, paginationType, tableType } from "@/types"

defineOptions({
  name: 'ProductsView',
  components: { Pagination, ProductForm, CommonModal },
})

const { t } = useI18n()
const store = useAppStore()

const pagination = ref<paginationType>({ page: 1, limit: 20, count: 0, totalPage: 0 })
const formType = ref("create")
const product = ref<Partial<productType>>({})
const isLoading = ref(false)
const isSaving = ref(false)
const loadError = ref<string | null>(null)
const table = reactive<tableType<productType>>({
  items: [],
  headers: ['actions', 'id', 'name', 'picture', 'category'],
  actions: [{ text: 'update', func: itemAction }, { text: 'delete', func: itemAction }]
})

const picture = ref<string>()
const pictureName = ref("")

function fileInput(file: File) {
  const reader = new FileReader()
  reader.addEventListener('load', readFile)
  reader.readAsDataURL(file)

  pictureName.value = file.name
}
function readFile(event: ProgressEvent<FileReader>) {
  const result = event.target?.result
  if (typeof result === "string") picture.value = result
}

async function itemAction() {
  const data = {
    ...product.value,
    ...(picture.value ? { picture: picture.value, picture_name: pictureName.value } : {}),
  }

  
  const categoryId = product.value.category_id || ""
  if (typeof categoryId !== "number" && categoryId.includes("-")) {
    const parenIdArr = categoryId.split("-")
    data.category_id = Number(parenIdArr[0])
  }

  isSaving.value = true
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
      document.querySelector<HTMLButtonElement>("#common-modal-close")?.click()
    }
  } catch (error) {
    store.addToast({ title: t('error'), text: getApiErrorMessage(error, t('requestFailed')) })
  } finally {
    isSaving.value = false
  }
}

async function showModal(type: string, id: number) {
  product.value = {}
  picture.value = undefined
  pictureName.value = ""
  formType.value = type
  if (id > -1) {
    try {
      await getItem(id)
    } catch (error) {
      store.addToast({ title: t('error'), text: getApiErrorMessage(error, t('requestFailed')) })
    }
  }
}

async function getItem(id: number) {
  const response = await api.get("/api/products/" + id)
  if (response.status === 200) {
    product.value = response.data.data
  }
}
onMounted(() => {
  void getItems(1, 20)
})

async function getItems(page = pagination.value.page, limit = pagination.value.limit) {
  isLoading.value = true
  loadError.value = null
  try {
    const response = await api.get(`/api/products?page=${page}&limit=${limit}`)
    if (response.status === 200) {
      table.items = response.data.data
      pagination.value = response.data.pagination
    }
  } catch (error) {
    loadError.value = getApiErrorMessage(error, t('requestFailed'))
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped lang="scss"></style>
