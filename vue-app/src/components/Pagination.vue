<template>
    <div>{{ model }}</div>
</template>
  
<script setup lang="ts">
import { defineModel, defineOptions } from "vue"

defineOptions({
    name: 'Paginations',
})
const model = defineModel()

</script>
  
<style scoped lang="scss"></style>