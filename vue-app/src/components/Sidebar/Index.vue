<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 rounded-end-4">
        <a href="/" class="d-flex align-items-center link-body-emphasis text-decoration-none">
            <AppIcon />
            <span class="fs-5" v-t="'header_title'"></span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <template v-for="(item, index) in items" :key="index">
                <template v-if="item.child_category && item.child_category.length > 0 && !item.parent_id">
                    <SidebarList :item="item" />
                </template>
                <template v-else>
                    <SidebarItem :text="item.name" :icon="item.icon ?? 'ri-file-list-3-line'" :size="26" :router="item.router ?? 'categories'" />
                </template>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineOptions, computed, ref } from "vue"
import { useStore } from "vuex"

import AppIcon from "../Icons/AppIcon.vue"
import SidebarItem from "./Item.vue"
import SidebarList from "./List.vue"
interface SidebarEntry {
    name: string
    icon?: string
    router?: string
    id?: number
    picture?: string
    parent_id?: number | string
    child_category?: SidebarEntry[]
}

defineOptions({
    name: 'SideBar',
    components: { SidebarItem, AppIcon, SidebarList },
})
const store = useStore()

const sidebarData = ref<SidebarEntry[]>([
    {
        name: "home",
        icon: "ri-home-2-line",
        router: "home",
    },
    {
        name: "products",
        icon: "ri-product-hunt-line",
        router: "products",
    },

])

const items = computed(() => {
    return [...sidebarData.value, {
        name: "categories",
        icon: "ri-file-list-3-line",
        router: "categories",
        parent_id: undefined,
        child_category: store.getters['getCategories'].map((item: SidebarEntry) => ({ ...item }))
    },]
})

</script>
  

<style scoped lang="scss">
.sidebar {
    background-color: var(--bs-gray-500);
    width: 100%;
    height: 100%
}
</style>
