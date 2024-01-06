<template>
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 rounded-end-4">
        <a href="/" class="d-flex align-items-center link-body-emphasis text-decoration-none">
            <AppIcon />
            <span class="fs-5" v-t="'header_title'"></span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <template v-for="(item, index) in items" :key="index">
                <SidebarItem :text="item.text" :icon="item.icon" :size="26" :router="item.router" />
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineOptions, ref } from "vue"

import AppIcon from "../Icons/AppIcon.vue"
import SidebarItem from "./Item.vue"
import HeaderData from "@/data/header"

defineOptions({
    name: 'SideBar',
    components: { SidebarItem, AppIcon },
})

const items = ref(HeaderData)

</script>
  

<style scoped lang="scss">
.sidebar {
    background-color: var(--bs-gray-500);
    width: 320px;
    min-height: calc(100% - 104px)
}
</style>