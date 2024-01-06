<template>
  <Header />
  <div class="page">
    <div class="page-left">
      <Sidebar />
    </div>
    <div class="page-right">
      <slot />
    </div>
  </div>
</template>
  
<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header/Index.vue"
import Sidebar from "@/components/Sidebar/Index.vue"

@Options({
  components: { Header, Sidebar },
})
export default class ProductsView extends Vue { }
</script>
  
<style scoped lang="scss">
.page {
  display: flex;
  float: left;
  width: 100%;
  min-height: calc(100% - 104px);

  .page-left {
    width: 320px;
  }

  .page-right {
    width: 80%;
  }
}
</style>