<template>
    <div class="category-select">
        <label for="exampleDataList" class="form-label">{{ props.title || $t('category') }}</label>
        <input v-model="model" :disabled="props.disabled" class="form-control" list="datalistOptions" id="exampleDataList"
            :placeholder="`${$t('category')} ${$t('select')}`">
        <datalist id="datalistOptions">
            <option :value="`${item.id}-${item.name}`" v-for="(item, index) in items" :key="index" />
        </datalist>
    </div>
</template>
  
<script setup lang="ts" generic="CategorySelect extends Vue">
import { Vue } from "vue-class-component"
import { ref, onMounted, defineOptions, defineModel, defineProps, watch } from "vue";

import api from "@/service";
import { categoryType } from "@/types"

defineOptions({
    name: 'CategorySelect',
    components: {},
})

const props = defineProps<{ disabled: boolean, title?: string }>()

const model = defineModel()

let items = ref<categoryType[]>([])

watch(model, async (newModel) => {
    if (newModel) {
        getItems()
    }
})

onMounted(async () => {
    getItems()
})

async function getItems() {
    const response = await api.get("/api/categories?all=1")
    if (response.status === 200) {
        items.value = response.data.data
    }
}

</script>
  
<style scoped lang="scss"></style>