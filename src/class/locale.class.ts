import { computed, ref } from 'vue'
const locale = {
  en: {
    "NAV_HOME": "Home",
    "NAV_EDITOR": "Editor",
    "NAV_EN": "English",
    "NAV_ZH": "中文",
    "BUTTON_DETAIL": "Detail",
    "BUTTON_DEMO": "Demo",
    "BUTTON_SOURCE": "Source code",
    "LABEL_CREATE": "Created with Mars Portfolio",
    "LABEL_POWERED": "Powered by Vue 3",
    "LABEL_COPYRIGHT": "Apollo Wayne. All rights reserved",
  },
  zh: {
    "NAV_HOME": "首页",
    "NAV_EDITOR": "编辑",
    "NAV_EN": "English",
    "NAV_ZH": "中文",
    "BUTTON_DETAIL": "查看详情",
    "BUTTON_DEMO": "查看示例",
    "BUTTON_SOURCE": "查看源代码",
    "LABEL_CREATE": "使用 Mars Portfolio 创建",
    "LABEL_POWERED": "由 Vue 3 强力驱动",
    "LABEL_COPYRIGHT": "Apollo Wayne. 保留所有权利",
  }
}
const defaultCulture: keyof typeof locale = navigator.language.startsWith("zh") ? "zh" : "en"
const savedCulture = localStorage.getItem("culture") as keyof typeof locale
const culture = ref<keyof typeof locale>(savedCulture && locale[savedCulture] ? savedCulture as keyof typeof locale : defaultCulture)
const dict = locale[culture.value]
export const _ = computed(() => (key: keyof typeof dict) => locale[culture.value][key])
export const getCurrentCulture = () => culture.value
export const updateCulture = (newCulture: keyof typeof locale) => {
  if (locale[newCulture]) {
    culture.value = newCulture
    localStorage.setItem("culture", newCulture)
    return true
  }
  return false
}