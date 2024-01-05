<template>
    <button type="button" class="btn btn-light" @click="changeLocale">{{ t($i18n.locale) }}</button>
</template>
  
<script setup lang="ts">
import { defineOptions } from "vue"
import { useI18n } from 'vue-i18n'
import { i18n } from "@/main"

const { t } = useI18n()

defineOptions({
    name: 'ChangeLang',
})

function changeLocale() {
    const otherLang = i18n.global.availableLocales.filter(i => i !== i18n.global.locale.value)
    
    i18n.global.locale.value = otherLang[0]
}

</script>
  
<style scoped lang="scss"></style>