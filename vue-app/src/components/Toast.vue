<template>
    <div class="toast-container position-absolute">
        <template v-for="(item, index) in toastItems" :key="index">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">{{ item.title }}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    {{ item.text }}
                </div>
            </div>
        </template>
    </div>
</template>
  
<script setup lang="ts" generic="Toast extends Vue">
import { Vue } from "vue-class-component";
import { computed } from "vue";
import { useStore } from 'vuex'

const store = useStore()

const toastItems = computed(() => {
    return store.getters["getToast"]
})
</script>
  
<style scoped lang="scss">
.toast-container {
    float: right;
    bottom: 1rem;
    right: 1rem;
}
</style>