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