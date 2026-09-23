<template>
    <div class="categories-form">
        <div class="mb-3">
            <label for="category-name" class="form-label">{{ $t('name') }}</label>
            <input type="text" :disabled="formDisable" v-model="model.name" class="form-control" id="category-name">
        </div>
        <img v-if="model.picture" :src="model.picture" class="img-thumbnail">
        <div class="mb-3">
            <label for="category-picture" class="form-label">{{ $t('picture') }}</label>
            <input type="file" :disabled="formDisable" accept="image/*" class="form-control" id="category-picture"
                @input="(e) => imageInput(e)">
        </div>
        <div class="mb-3">
            <CategorySelect :title="`${$t('parent')} ${$t('category')}`" :disabled="formDisable" v-model="model.parent_id" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineModel, defineProps, defineOptions, computed, defineEmits, watch } from "vue"

import CategorySelect from "./Select.vue"
import { categoryType } from "@/types";

defineOptions({
    name: 'CategoryForm',
    components: { CategorySelect },
})
const emit = defineEmits(['fileInput'])
const props = defineProps<{ type: string }>()
const model = defineModel<Partial<categoryType>>({ default: () => ({}) })

const formDisable = computed(() => {
    return props.type === "delete"
})

watch(() => props.type, (newType) => {
    if (!newType && model.value) {
        model.value.parent_id = undefined
    }
})

function imageInput(e: Event) {
    const input = e.target as HTMLInputElement | null
    const file = input?.files?.[0]
    if (!file) return
    emit('fileInput', file)
}

</script>
  
<style scoped lang="scss"></style>
