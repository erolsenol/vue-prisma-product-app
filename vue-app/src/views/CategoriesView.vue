<template>
  <div>
    Categories
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header/Index.vue"

@Options({
  components: { Header },
})
export default class CategoriesView extends Vue { }
</script>

<style scoped lang="scss">

</style>