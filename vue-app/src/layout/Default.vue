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
  
<script setup lang="ts">
import Header from "@/components/Header/Index.vue"
import Sidebar from "@/components/Sidebar/Index.vue"
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
    min-height: calc(100vh - 230px);
  }
}
</style>
