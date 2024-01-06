<template>
    <div class="categories-form">
        <div class="mb-3">
            <label for="category-name" class="form-label">{{ $t('name') }}</label>
            <input type="text" v-model="model.name" class="form-control" id="category-name">
        </div>
        <div class="mb-3">
            <label for="category-picture" class="form-label">{{ $t('picture') }}</label>
            <input type="file" class="form-control" id="category-picture" @input="imageInput">
        </div>
        <div class="mb-3">
            <CategorySelect v-model="model.parent_id" />
        </div>
    </div>
</template>
  
<script setup lang="ts" generic="CategoryForm extends Vue">
import { Vue } from "vue-class-component"
import { reactive, defineModel, onMounted, defineOptions } from "vue";
import { useI18n } from "vue-i18n"

import CategorySelect from "./Select.vue"
import { categoryType } from "@/types";

defineOptions({
    name: 'CategoryForm',
    components: { CategorySelect },
})
const model: categoryType | any = defineModel({ default: () => ({}) })

const { t } = useI18n()

const data = reactive({})

function imageInput(e: InputEvent) {
    if (!e) return
    const file: File = e.target.files[0]
    console.log("file", file);
}

</script>
  
<style scoped lang="scss"></style>