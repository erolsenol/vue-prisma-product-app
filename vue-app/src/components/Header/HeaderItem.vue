<template>
  <li>
    <a href="#" class="nav-link text-white">
      <i :class="props.icon" :style="
           {
            width: props.size,
            height: props.size,
          }
        ">
      </i>
      <span>
        {{ props.text }}
      </span>
    </a>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

export interface Props {
  text: string
  icon: string
  size: number
}

const props = defineProps<Props>()

console.log("props", props)
</script>
