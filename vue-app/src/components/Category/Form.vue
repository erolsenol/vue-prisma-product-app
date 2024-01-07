<template>
    <div class="categories-form">
        <div class="mb-3">
            <label for="category-name" class="form-label">{{ $t('name') }}</label>
            <input type="text" :disabled="formDisable" v-model="model.name" class="form-control" id="category-name">
        </div>
        <div class="mb-3">
            <label for="category-picture" class="form-label">{{ $t('picture') }}</label>
            <input type="file" :disabled="formDisable" class="form-control" id="category-picture"
                @input="(e) => imageInput(e)">
        </div>
        <div class="mb-3">
            <CategorySelect :disabled="formDisable" v-model="model.parent_id" />
        </div>
    </div>
</template>
  
<script setup lang="ts" generic="CategoryForm extends Vue">
import { Vue } from "vue-class-component"
import { reactive, defineModel, defineProps, defineOptions, computed } from "vue";
import { useI18n } from "vue-i18n"

import CategorySelect from "./Select.vue"
import { categoryType } from "@/types";

defineOptions({
    name: 'CategoryForm',
    components: { CategorySelect },
})
const props = defineProps<{ type: string }>()
const model: categoryType | any = defineModel({ default: () => ({}) })

const formDisable = computed(() => {
    return props.type === "delete"
})

function imageInput(e: Event) {
    if (!e) return
    const file: File = e.target.files[0]
}

</script>
  
<style scoped lang="scss"></style>