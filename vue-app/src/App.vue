<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
  <Toast />
</template>

<script setup>
import { onMounted, defineOptions } from "vue"
import store from "@/store"

import Toast from "@/components/Toast"

defineOptions({
  name: 'App',
  components: { Toast },
})

onMounted(async () => {
  store.dispatch("initData")
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
</style>
