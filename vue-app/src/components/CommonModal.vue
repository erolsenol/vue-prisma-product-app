<template>
    <div class="modal fade common-modal" id="common-modal" attrs>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel" v-if="props.title">{{ props.title }}</h1>
                    <slot name="header" v-else></slot>
                    <button type="button" class="btn-close" id="common-modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot name="content"></slot>
                </div>
                <div class="modal-footer">
                    {{ props.closeText }}
                    <template v-if="footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ props.closeText
                        }}</button>
                        <button type="button" class="btn btn-primary">{{ props.saveText }}</button>
                    </template>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts" generic="CommonModal extends Vue">
import { Vue } from "vue-class-component"
import { defineProps, defineOptions } from "vue";
import { useI18n } from "vue-i18n"

defineOptions({
    name: 'CategoryForm',
    components: {},
})


const { t } = useI18n()

interface Props {
    title?: string
    closeText?: string
    saveText?: string,
    footer: boolean
}

const props = defineProps<Props>()

</script>
  
<style scoped lang="scss"></style>