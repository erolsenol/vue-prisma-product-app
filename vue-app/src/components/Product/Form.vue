<template>
    <div class="products-form">
        <div class="mb-3">
            <label for="product-name" class="form-label">{{ $t('name') }}</label>
            <input type="text" :disabled="formDisable" v-model="model.name" class="form-control" id="product-name">
        </div>
        <img v-if="model.picture" :src="model.picture" class="img-thumbnail">
        <div class="mb-3">
            <label for="product-picture" class="form-label">{{ $t('picture') }}</label>
            <input type="file" :disabled="formDisable" accept="image/*" class="form-control" id="product-picture"
                @input="(e) => imageInput(e)">
        </div>
        <div class="mb-3">
            <CategorySelect :disabled="formDisable" v-model="model.category_id" />
        </div>
    </div>
</template>
  
<script setup lang="ts" generic="ProductForm extends Vue">
import { Vue } from "vue-class-component"
import { defineModel, defineProps, defineOptions, computed, defineEmits } from "vue";

import CategorySelect from "@/components/Category/Select.vue"
import { productType } from "@/types";

defineOptions({
    name: 'ProductForm',
    components: { CategorySelect },
})
const emit = defineEmits(['fileInput'])
const props = defineProps<{ type: string }>()
const model = defineModel<productType>({ default: () => ({}) })

const formDisable = computed(() => {
    return props.type === "delete"
})

function imageInput(e: Event) {
    if (!e?.target?.files[0]) return
    emit('fileInput', e.target.files[0])
}

</script>
  
<style scoped lang="scss"></style>