<template>
  <div class="container">
    Home
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Header from "@/components/Header/Index.vue"

@Options({
  components: { Header },
})
export default class HomeView extends Vue { }
</script>
