<template>
  <header class="rounded-bottom-4">
    <div class="container d-flex flex-wrap justify-content-center py-3">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <AppIcon />
        <span class="fs-4" v-t="'header_title'"></span>
      </a>

      <ul class="nav nav-pills">
        <template v-for="(item, index) in items" :key="index">
          <HeaderItem :text="item.text" :icon="item.icon" :size="26" :router="item.router" />
        </template>
      </ul>
      <ChangeLang />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'
import { useI18n } from 'vue-i18n'

import HeaderItem from "./Item.vue"
import ChangeLang from "./ChangeLang.vue"
import AppIcon from "../Icons/AppIcon.vue"
import HeaderData from "@/data/header"

defineOptions({
  name: 'Header',
  components: { HeaderItem, ChangeLang, AppIcon },
})

const items = ref(HeaderData)

</script>

<style scoped lang="scss">
header {
  background-color: var(--bs-gray-500);
  box-sizing: border-box;
  margin-bottom: 14px;
  height: 90px;
}
</style>