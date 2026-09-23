<template>
    <SidebarItem
        @click="stateChange"
        :listState="listState"
        :hasChild="hasChildren"
        :text="props.item.name"
        :icon="props.item.icon ?? 'ri-file-list-3-line'"
        :size="26"
        :router="props.item.router ?? 'categories'"
    />
    <div class="nav-category ms-2" :class="listState ? 'category-open' : ''">
        <template v-for="(child, index) in props.item.child_category" :key="index">
            <SidebarList :item="child" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, defineOptions, defineProps, ref } from "vue"
import SidebarItem from "./Item.vue"

defineOptions({
    name: 'SideBarList',
    components: { SidebarItem },
})

interface SidebarEntry {
    name: string
    icon?: string
    router?: string
    child_category?: SidebarEntry[]
}

interface Props { item: SidebarEntry }

const props = defineProps<Props>()
const listState = ref(false)
const hasChildren = computed(() => (props.item.child_category?.length ?? 0) > 0)

function stateChange(): void {
    if (hasChildren.value) listState.value = !listState.value
}
</script>

<style scoped lang="scss">
.sidebar {
    background-color: var(--bs-gray-500);
    width: 100%;
    height: 100%
}

.nav-category {
    display: none;
}

.category-open {
    display: block !important
}
</style>
