<script setup lang="ts">
import { getMainNews, getRecNews, getLastNews } from './services'
import { onMounted, ref } from 'vue'
import Course from '@/components/course/Course.vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const lastNews = ref<any[]>([])
const recNews = ref<any[]>([])
const lsNews = ref<any>(null)
const isLoading = ref(true)

onMounted(async () => {
    try {
        isLoading.value = true
        const [mainNewsData, recNewsData, lsNewsData] = await Promise.all([
            getMainNews(),
            getRecNews(),
            getLastNews()
        ])

        lastNews.value = mainNewsData || []
        recNews.value = recNewsData || []
        lsNews.value = lsNewsData || null

        // console.log('Latest news loaded:', lsNews.value)
    } catch (error) {
        console.error('Error loading news:', error)
    } finally {
        isLoading.value = false
    }
})

// Format date function
const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('uz-UZ', {
        day: 'numeric',
        month: 'short'
    }).format(date)
}

// Expose Swiper modules
const modules = [FreeMode, Pagination, Autoplay]
</script>

<template>
    <div class="max-w-7xl mx-auto  sm:px-6  py-6">

        <div v-if="isLoading" class="flex justify-center items-center min-h-[300px]">
            <div class="animate-pulse text-slate-500">Yuklanmoqda...</div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div class="flex flex-col gap-6">
                <div v-if="lsNews" class="relative rounded-sm overflow-hidden shadow-md group">
                    <img :src="`https://fargona24.uz/storage/${lsNews.photo}`" :alt="lsNews.name"
                        class="w-full h-60 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div class="absolute bottom-0 left-0 w-full p-4">
                            <span class="inline-block px-2 py-1 text-xs bg-[#173044] text-white rounded mb-2">
                                Asosiy yangilik
                            </span>
                            <h2 class="text-white text-lg sm:text-xl font-bold line-clamp-2 mb-2">
                                {{ lsNews.name }}
                            </h2>
                            <p class="text-white/80 text-xs">
                                {{ formatDate(lsNews.created_at) }}
                            </p>
                        </div>
                    </div>
                </div>


                <div class=" overflow-hidden">
                    <h2 class="text-lg font-bold text-slate-900 mb-3">Tavsiya etilgan</h2>
                    <swiper :slidesPerView="1" :loop="true" :autoplay="{
                        delay: 3500,
                        disableOnInteraction: false
                    }" :spaceBetween="20" :freeMode="true" :pagination="{
                clickable: true,
                dynamicBullets: true
            }" :modules="modules" :breakpoints="{
                    640: {
                        slidesPerView: 1.5,
                    },
                    768: {
                        slidesPerView: 2,
                    }
                }" class="mySwiper ">
                        <swiper-slide v-for="(item, index) in recNews" :key="index"
                            class="relative rounded-sm overflow-hidden shadow-sm group h-60 sm:h-56">
                            <img :src="`https://fargona24.uz/storage/${item.photo}`" :alt="item.title"
                                class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <div class="absolute bottom-0 left-0 w-full p-3">
                                    <p class="text-white text-sm font-semibold line-clamp-2">
                                        {{ item.title }}
                                    </p>
                                    <p class="text-white/80 text-xs mt-1">
                                        {{ formatDate(item.created_at) }}
                                    </p>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>


            <div class="bg-white  shadow-sm overflow-hidden">
                <h1 class="text-xl text-slate-900 py-3 px-4 border-b font-bold border-slate-200">
                    Yangiliklar
                </h1>

                <div class="divide-y divide-slate-200">
                    <div v-for="(item, index) in lastNews" :key="index"
                        class="flex flex-row items-center p-3 hover:bg-slate-50 transition-colors duration-200">
                        <!-- Image section -->
                        <div class="w-24 sm:w-28 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img :src="`https://fargona24.uz/storage/${item.photo}`" :alt="item.name"
                                class="w-full h-full object-cover" loading="lazy">
                        </div>

                        <div class="flex-1 ml-3">
                            <h2
                                class="text-sm font-bold text-slate-900 hover:text-[#173044] transition-colors duration-200 line-clamp-2">
                                {{ item.name }}
                            </h2>
                            <div class="flex items-center mt-1">
                                <span class="text-xs text-slate-500">
                                    {{ formatDate(item.created_at) }}
                                </span>
                                <span class="mx-2 text-slate-300">•</span>
                                <span class="text-xs text-[#173044]">
                                    Batafsil
                                </span>
                            </div>
                        </div>
                    </div>


                    <div v-if="!lastNews || lastNews.length === 0" class="py-8 text-center text-slate-500">
                        Hozircha yangiliklar mavjud emas
                    </div>
                </div>


            </div>
        </div>

        <Course />
    </div>
</template>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;

    overflow: hidden;
}

/* Custom swiper pagination styling */
:deep(.swiper-pagination-bullet) {
    background: white;
    opacity: 0.6;
}

:deep(.swiper-pagination-bullet-active) {
    background: white;
    opacity: 1;
}

/* Smooth image loading */
</style>