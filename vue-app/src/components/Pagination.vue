<template>
    <nav class="p-0 me-2">
        <ul class="pagination d-flex flex-row justify-content-end mb-0">
            <li class="page-item" @click="selectPage(model.page - 1)">
                <a class="page-link" :class="model?.page == 1 ? 'disabled' : ''">Previous</a>
            </li>
            <li class="page-item" @click="selectPage(item)" v-for="(item, index) in  items " :key="index"
                v-show="model?.totalPage >= item">
                <a class="page-link" :class="{
                    'active': model.page === item,
                }">
                    {{ item }}
                </a>
            </li>
            <li class="page-item" @click="selectPage(model.page + 1)">
                <a class="page-link" :class="model?.totalPage == model?.page ? 'disabled' : ''" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>
  
<script setup lang="ts">
import { defineModel, defineOptions, computed, defineEmits } from "vue"
import { paginationType } from "@/types";

defineOptions({
    name: 'Paginations',
})
const emit = defineEmits(['selectPage'])
const model = defineModel<paginationType>({})

const items = computed(() => {
    if (model.value.totalPage > 1) {
        return [1, 2, 3]
    } else if (model.value.page > 2) {
        return [model.value.page - 1, model.value.page, model.value.page + 1]
    }
    return []
})

function selectPage(page: number) {
    console.log("model.value?.totalPage < page", model.value?.totalPage < page);
    if (model.value?.page === page || page < 1 || model.value?.totalPage < page) {
        return
    }
    emit('selectPage', page)
}

</script>
  
<style scoped lang="scss">
.pagination {
    li {
        cursor: pointer;
    }
}
</style>