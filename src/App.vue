<script setup lang="ts">
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayouts.vue";
import { useHead } from '@vueuse/head'
const route = useRoute();


useHead({
  title: "Farg'ona24 - Fargonadagi eng tezkor yangiliklar olami",
  meta: [
    {
      name: 'description',
      content: "Farg'ona24 - Fargonadagi eng tezkor yangiliklar olami. Farg'ona yangiliklar, Fargona tezkor"
    },
    {
      name: 'keywords',
      content: "Farg'ona, Farg'ona yangiliklari, yangiliklar, tezkor xabarlar"
    },
    {
      property: "og:title",
      content: "Farg'ona 24 | Bosh sahifa"
    },
    {
      property: 'og:image', 
      content: 'https://ik.imagekit.io/vtroph5l9/Product/logotip.jpg?updatedAt=1746790238401',
    },
    {
      property: 'og:url',
      content: 'https://fargona24.uz/', 
    }
  ]
})

</script>
<template>
  <component :is="route.meta.layout || DefaultLayout">
    <RouterView />
  </component>
</template>
