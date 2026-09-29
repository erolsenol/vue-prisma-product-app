<template>
  <div v-if="store.error" class="app-error" role="alert" aria-live="polite">
    {{ store.error }}
  </div>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
  <Toast />
</template>

<script setup lang="ts">
import { onMounted } from "vue"

import Toast from "@/components/Toast.vue"
import { useAppStore } from "@/stores/app"

const store = useAppStore()

onMounted(async () => {
  await store.initData().catch(() => undefined)
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.app-error {
  position: fixed;
  z-index: 2000;
  top: 1rem;
  right: 1rem;
  max-width: min(28rem, calc(100vw - 2rem));
  padding: 0.75rem 1rem;
  color: #842029;
  background: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 0.375rem;
}
</style>
