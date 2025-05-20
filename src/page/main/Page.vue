<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Banner from '../banner/Page.vue'
import Course from '@/components/course/Course.vue'
import Tech from '@/page/category/Sport.vue'
import Video from '../video/Video.vue'
import Society from '../category/Society.vue'
import International from '../category/International.vue'
import InterviewVideo from '../video/InterviewVideo.vue'
import Recommendation from '../recommendation/Page.vue'
import { fetchAllRec } from '@/page/postdetail/services'



const allRecData = ref<{ data: any[] } | null>(null)

const loadAllRec = async () => {
   allRecData.value = await fetchAllRec(1)
}

onMounted(() => {
   loadAllRec()
})
import { useHead } from '@vueuse/head'
useHead({
    title: "Farg'ona24 - Farg'onadagi eng tezkor yangiliklar olami",
    meta: [
        {
            name: 'description',
            content: "Farg'ona24 - Fargonadagi eng tezkor yangiliklar olami. Farg'ona yangiliklar, Fargona tezkor"
        },
        {
            name: 'keywords',
            content: " fargona24 , fargona 24 ,Farg'ona, Farg'ona yangiliklari,  yangiliklar, tezkor xabarlar, Fargona24, Farg'ona voqealari, O‘zbekiston yangiliklari"
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
   <Banner />
   <Society />
   <International />
   <Video />
   <Tech />
   <InterviewVideo />
   <div class="p-5">
      <Recommendation v-if="allRecData" :items="allRecData.data" :categoryId="1"
         title="Barcha tavsiya etilgan yangiliklar" />
   </div>
</template>