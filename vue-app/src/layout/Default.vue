<template>
    <Header />
    <Sidebar />
    <slot />
</template>
  
<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header/Index.vue"
import Sidebar from "@/components/Sidebar/Index.vue"

@Options({
  components: { Header,Sidebar },
})
export default class ProductsView extends Vue { }
</script>
  