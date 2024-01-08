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
  
<script setup lang="ts" generic="CategoryForm extends Vue">
import { Vue } from "vue-class-component"
import { defineModel, defineProps, defineOptions, computed, defineEmits,watch } from "vue"

import CategorySelect from "./Select.vue"
import { categoryType } from "@/types";

defineOptions({
    name: 'CategoryForm',
    components: { CategorySelect },
})
const emit = defineEmits(['fileInput'])
const props = defineProps<{ type: string }>()
const model: categoryType | any = defineModel({ default: () => ({}) })

const formDisable = computed(() => {
    return props.type === "delete"
})

watch(props.type, async (newType) => {
    if (!newType) {
        model.value.parent_id = null
    }
})

function imageInput(e: Event) {
    if (!e?.target?.files[0]) return
    emit('fileInput', e.target.files[0])
}

</script>
  
<style scoped lang="scss"></style>