<template>
  <li>
    <a href="#" class="nav-link text-white border border-white border-opacity-50">
      <i class="header-item-icon" :class="props.icon" :style="style">
      </i>
      <span>
        {{ props.text }}
      </span>
    </a>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineOptions, reactive } from "vue"
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'HeaderItem',
})

export interface Props {
  text: string
  icon: string
  size: number
}

const { t } = useI18n()

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
      background-color: var(--bs-gray-600);
    }
  }
}

.nav-link:last-child() {
  margin-right: 0;
}
</style>