<template>
    <div class="category-select">
        <label for="exampleDataList" class="form-label">{{ $t('category') }}</label>
        <input v-model="model" :disabled="props.disabled" class="form-control" list="datalistOptions" id="exampleDataList"
            :placeholder="`${$t('category')} ${$t('select')}`">
        <datalist id="datalistOptions">
            <option :value="`${item.id}-${item.name}`" v-for="(item, index) in items" :key="index" />
        </datalist>
    </div>
</template>
  
<script setup lang="ts" generic="CategorySelect extends Vue">
import { Vue } from "vue-class-component"
import { ref, onMounted, defineOptions, defineModel, defineProps } from "vue";

import api from "@/service";
import { categoryType } from "@/types"

defineOptions({
    name: 'CategorySelect',
    components: {},
})

const props = defineProps<{ disabled: boolean }>()

const model = defineModel()


let items = ref<categoryType[]>([])

onMounted(async () => {
    const response = await api.get("/api/categories?all=1")
    if (response.status === 200) {
        items.value = response.data.data
    }
})

</script>
  
<style scoped lang="scss"></style>