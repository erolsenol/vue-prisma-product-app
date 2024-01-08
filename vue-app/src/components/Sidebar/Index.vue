<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 rounded-end-4">
        <a href="/" class="d-flex align-items-center link-body-emphasis text-decoration-none">
            <AppIcon />
            <span class="fs-5" v-t="'header_title'"></span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <template v-for="(item, index) in items" :key="index">
                <template v-if="item?.child_category?.length > 0 && !item.parent_id">
                    <SidebarList :item="item" />
                </template>
                <template v-else>
                    <SidebarItem :text="item.name" :icon="item.icon" :size="26" :router="item.router" />
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

defineOptions({
    name: 'SideBar',
    components: { SidebarItem, AppIcon, SidebarList },
})
const store = useStore()

const sidebarData = ref([
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
        child_category: store.getters['getCategories'].map(i =>{
            const data = i
            delete data.picture
            return data
        })
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