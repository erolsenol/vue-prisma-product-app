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
export default class LayoutDefault extends Vue { }
</script>
  
<style lang="scss">
.page {
  display: flex;
  float: left;
  width: 100%;
  min-height: calc(100% - 104px);

  .page-left {
    width: 320px;
    min-height: auto;
  }

  .page-right {
    width: 80%;
    min-height: auto;
    
    overflow: scroll;
  }
  .page-table {
    overflow-y: scroll;
    max-height: calc(100vh - 220px);
  }
}
</style>