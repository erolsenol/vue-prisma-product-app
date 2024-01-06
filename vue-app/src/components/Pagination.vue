<template>
    <div>pagination</div>
</template>
  
<script setup lang="ts">
import { defineProps, defineOptions } from "vue"

defineOptions({
    name: 'Paginations',
})

export interface Props {
    text: string
    icon: string
    size: number
    router: string
}

const props = defineProps<Props>()

</script>
  
<style scoped lang="scss"></style>