<template>
  <header class="header rounded-bottom-4">
    <div class="container d-flex flex-wrap justify-content-center py-2">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-4" v-t="'header_title'"></span>
      </a>


      <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
        <template v-for="(item, index) in items" :key="index">
          <HeaderItem :text="item.text" :icon="item.icon" :size="26" />
        </template>
      </ul>
      <ChangeLang />

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'
import HeaderItem from "./HeaderItem.vue"
import ChangeLang from "./ChangeLang.vue"
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'Header',
  components: { HeaderItem, ChangeLang },
})

const { t } = useI18n()

const items = ref([{
  text: t('home'),
  icon: "ri-home-2-line"
},
{
  text: t('categories'),
  icon: "ri-file-list-3-line"
},
{
  text: t('products'),
  icon: "ri-product-hunt-line"
}])
</script>

<style scoped lang="scss">
</style>