<template>
    <div class="d-flex flex-row align-items-center pagination-container">
        <nav class="p-0 me-5">
            <ul class="pagination d-flex flex-row justify-content-end mb-0">

                <li class="page-item" @click="selectPage(item, newLimit)" v-for="(item, index) in items " :key="index"
                    v-show="model?.totalPage >= item">
                    <a class="page-link" :class="{
                        'active': model.page == item,
                    }">
                        {{ item }}
                    </a>
                </li>

            </ul>
        </nav>
        <div class="d-flex flex-row pagination-input me-3">
            <label class="pagination-input-page-label ms-3 me-2" for="pagination-input-page">{{ $t('page') }}:</label>
            <input type="text" v-model="newPage" class="form-control pagination-input-page" id="pagination-input-page">

            <label class="pagination-input-limit-label ms-3 me-2" for="pagination-input-limit">{{ $t('limit') }}:</label>
            <select class="form-select pagination-input-limit" id="pagination-input-limit" v-model="newLimit">
                <option v-for="(number, index) in [5, 10, 20, 30, 40, 50]" :key="index" :value="number">{{ number }}
                </option>
            </select>
            <button class="btn btn-outline-primary mx-3" @click="selectPage(newPage, newLimit)">{{ $t('go')
            }}</button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineModel, defineOptions, computed, defineEmits, ref } from "vue"
import { paginationType } from "@/types";

defineOptions({
    name: 'Pagination',
})
const emit = defineEmits(['selectPage'])
const model = defineModel<paginationType>({})

const items = computed(() => {
    const numbers = []
    if (model.value.page > 2) {
        return [model.value.page - 1, model.value.page, model.value.page + 1]
    } else if (model.value.page <= 2) {
        for (let index = 1; index <= model.value.page; index++) {
            numbers.push(index)
        }
        if (model.value.page < model.value?.totalPage) {
            numbers.push(model.value.page + 1)
        }
    }
    return numbers
})


let newPage = ref(1)
let newLimit = ref(20)

function selectPage(page = 1, limit = 20) {
    if ((model.value?.page == page || page < 1 || model.value?.totalPage < page) && model.value?.limit == limit) {
        return
    }
    newPage.value = page
    newLimit.value = limit
    emit('selectPage', page, limit)
}

</script>
  
<style scoped lang="scss">
.pagination-container {}

.pagination {
    li {
        cursor: pointer;
    }
}

.pagination-input-page,
.pagination-input-limit {
    width: 5rem;
}

.pagination-input-limit-label,
.pagination-input-page-label {
    line-height: 36px;
}
</style>