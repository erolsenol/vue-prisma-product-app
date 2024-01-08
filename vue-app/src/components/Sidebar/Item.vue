<template>
    <li class="nav-item">
        <router-link class="nav-link link-body-emphasis d-flex flex-row align-items-center justify-content-around py-0 mb-1"
            :to="{ name: props.router }">
            <i class="header-item-icon w-50" :class="props.icon || 'ri-home-2-line'" :style="style">
            </i>
            <span class="w-50">{{ $t(props.text) }}</span>
            <i v-if="hasChild" :class="listState ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'"></i>
        </router-link>
    </li>
</template>
  
<script setup lang="ts">
import { defineProps, defineOptions, reactive } from "vue"
import 'vue-i18n'

defineOptions({
    name: 'SideBarItem',
})

export interface Props {
    text: string
    icon: string
    size: number
    router: string
    listState: boolean
    hasChild: boolean
}

const props = defineProps<Props>()

const style = reactive({
    fontSize: `${props.size}px`,
})

</script>
  
<style scoped lang="scss">
li {
    .nav-link {
        &:hover {
            background-color: var(--bs-gray-400);
        }
    }

    .router-link-active {
        background-color: var(--bs-gray-300);
    }
}
</style>