// useLangStore.ts
import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
  state: () => ({
    lang: 'uz'
  }),
  actions: {
    setLang(newLang: string) {
      this.lang = newLang
    }
  }
})
