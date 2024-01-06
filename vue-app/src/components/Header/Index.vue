<template>
  <header class="rounded-bottom-4">
    <div class="container d-flex flex-wrap justify-content-center py-3 mb-4">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <i class="ri-apps-fill app-icon me-2"></i>
        <span class="fs-4" v-t="'header_title'"></span>
      </a>

      <ul class="nav nav-pills">
        <template v-for="(item, index) in items" :key="index">
          <HeaderItem :text="item.text" :icon="item.icon" :size="26" :router="item.router" />
        </template>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'
import HeaderItem from "./Item.vue"
import ChangeLang from "./ChangeLang.vue"
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'Header',
  components: { HeaderItem, ChangeLang },
})

const { t } = useI18n()

const items = ref([{
  text: t('home'),
  icon: "ri-home-2-line",
  router: "/"
},
{
  text: t('categories'),
  icon: "ri-file-list-3-line",
  router: "/categories"
},
{
  text: t('products'),
  icon: "ri-product-hunt-line",
  router: "/products"
}])
</script>

<style scoped lang="scss">
header {
  background-color: var(--bs-gray-500);

  .app-icon {
    font-size: 2rem;
  }
}

.header {
  .container {
    max-height: 80px;
  }
}
</style>