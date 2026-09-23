<template>
    <div class="product-select">
        <label for="exampleDataList" class="form-label">{{ $t('product') }}</label>
        <input v-model="model" :disabled="props.disabled" class="form-control" list="datalistOptions" id="exampleDataList"
            :placeholder="`${$t('product')} ${$t('select')}`">
        <datalist id="datalistOptions">
            <option :value="`${item.id}-${item.name}`" v-for="(item, index) in items" :key="index" />
        </datalist>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, defineOptions, defineModel, defineProps } from "vue";

import api from "@/service";
import { productType } from "@/types"

defineOptions({
    name: 'ProductSelect',
    components: {},
})

const props = defineProps<{ disabled: boolean }>()

const model = defineModel<string | number | undefined>()


let items = ref<productType[]>([])

onMounted(async () => {
    const response = await api.get("/api/products?all=1")
    if (response.status === 200) {
        items.value = response.data.data
    }
})

</script>
  
<style scoped lang="scss"></style>
