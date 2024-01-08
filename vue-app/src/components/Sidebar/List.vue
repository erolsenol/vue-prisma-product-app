<template>
    <SidebarItem @click="listState = !listState" :listState="listState" :text="props.item.name" :icon="props.item.icon" :size="26"
        :router="props.item.router" />
    <div class="nav-category ms-2" :class="listState ? 'category-open' : ''">
        <template v-for="(child, index) in props.item.child_category" :key="index">
            <SidebarList :item="child" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { defineOptions, defineProps, ref } from "vue"
import SidebarItem from "./Item.vue"
import SidebarList from "./List.vue"

defineOptions({
    name: 'SideBarList',
    components: { SidebarItem,SidebarList },
})

interface Props {
    item: object
}

const props = defineProps<Props>()
let listState = ref(false)

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



@keyframes sideAnimation {
    from {
        height: 0px;
    }

    to {
        height: 100px;
        /* your line height here */
    }
}
</style>

