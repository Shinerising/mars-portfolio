<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { updateCulture } from './class/locale.class'

const route = useRoute()

watch(() => route.query.lang, (lang) => {
  if (lang) {
    const locale = lang as "en" | "zh"
    document.documentElement.lang = locale
    updateCulture(locale)
  }
}, { immediate: true })

const updateTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

updateTheme()

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
