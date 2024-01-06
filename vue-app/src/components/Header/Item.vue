<template>
  <li>
    <router-link class="nav-link text-black border border-black border-opacity-50" :to="{ name: props.router }">
      <i class="header-item-icon" :class="props.icon" :style="style">
      </i>
      <span>
        {{ $t(props.text) }}
      </span>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineOptions, reactive } from "vue"

defineOptions({
  name: 'HeaderItem',
})

export interface Props {
  text: string
  icon: string
  size: number
  router: string
}

const props = defineProps<Props>()

const style = reactive({
  fontSize: `${props.size}px`,
})

</script>

<style scoped lang="scss">
li {
  .nav-link {
    display: flex;
    flex-direction: column;
    padding: 0.1rem 1rem;
    margin-right: 1rem;

    i {
      height: 32px;
    }

    &:hover {
      background-color: var(--bs-gray-400);
    }
  }

  .router-link-active {
    background-color: var(--bs-gray-300);
  }
}
</style>