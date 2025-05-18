<script setup lang="ts">
import { getMainNews, getRecNews, getLastNews } from './services'
import { onMounted, ref, watch, computed } from 'vue'
import Course from '@/components/course/Course.vue'
import { Skeleton } from '@/components/ui/skeleton'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { useLangStore } from '@/stores/lang';
import { useHead } from '@vueuse/head'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
 interface Recnews{
    photo:string
 }
 
const lastNews = ref<any[]>([])
const recNews = ref<Recnews>({ photo: '' })
const lsNews = ref<any>(null)
const isLoading = ref(true)
const store = useLangStore()

const mainText = computed(() => {
    if (store.lang === 'uz') {
        return {
            title: 'So‘nggi yangiliklar',
            button: 'Asosiy yangilik'
        };
    }
    if (store.lang === 'ru') {
        return {
            title: 'Последние новости',
            button: 'Главные новости'
        };
    }
    if (store.lang === 'kr') {
        return {
            title: 'Сўнгги янгилилар',
            button: 'Асосий янгилик'
        };
    }
});
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

const getNewsHandler = async () => {
    try {
        const [mainNewsData, recNewsData, lsNewsData] = await Promise.all([
            getMainNews(),
            getRecNews(),
            getLastNews()
        ])
        lastNews.value = mainNewsData
        recNews.value = recNewsData
        lsNews.value = lsNewsData || null       
    } catch (error) {
        console.error('Error loading news:', error)
    } finally {
    }
}

watch(() => store.lang, async () => {
    await getNewsHandler()
})

onMounted(async () => {
    isLoading.value = true
    await getNewsHandler()
    isLoading.value = false
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
    <div class="max-w-[1250px] mx-auto  sm:px-6  pt-6 p-4 ">

        <div v-if="isLoading"
            class="grid md:grid-cols-2 grid-cols-1 gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl min-h-[300px] items-center">
            <div class="space-y-4">
                <Skeleton class="w-full h-24 bg-gray-300 dark:bg-gray-700 rounded-2xl" />
                <Skeleton class="w-full h-24 bg-gray-300 dark:bg-gray-700 rounded-2xl" />
            </div>
            <div>
                <Skeleton class="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-2xl object-contain" />
            </div>
        </div>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="flex flex-col gap-6">
                <div v-if="lsNews" class="relative rounded-xl overflow-hidden shadow-md group">
                    <img :src="`https://fargona24.uz/storage/${lsNews.photo}`" loading="lazy" :alt="lsNews.name"
                        class="w-full h-[360px] sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div class="absolute bottom-0 left-0 w-full p-4">
                            <span class="inline-block px-2 py-1 text-xs bg-[#173044] text-white rounded mb-2">
                                {{mainText?.button}}
                            </span>
                            <router-link :to="`/news/n/${lsNews.id}`" class="block cursor-pointer">
                                <h2 class="text-white text-[16px] sm:text-xl font-bold line-clamp-2 mb-2">
                                    {{ lsNews.name }}
                                </h2>
                            </router-link>
                            <p class="text-white text-xs">
                                {{lsNews.category.name}}
                            </p>
                        </div>
                    </div>
                </div>


                <div class=" overflow-hidden">
                    <div class="w-full ">
                        <img class="w-full h-[360px] rounded-xl" :src="`https://fargona24.uz/storage/${recNews.photo}`"
                            alt="Reklama uchun joy..." loading="lazy">
                    </div>
                </div>
            </div>


            <div class=" bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
                <h1
                    class="text-xl text-slate-900 py-3 dark:text-white px-4 border-b font-bold border-slate-200 dark:border-slate-500">
                    {{mainText?.title}}
                </h1>

                <div class="divide-y divide-slate-200 dark:divide-slate-500 ">
                    <router-link v-for="(item, index) in lastNews" :key="index" :to="`/news/n/${item.id}`"
                        class="flex flex-row items-center cursor-pointer p-3 transition-colors duration-200 no-underline">
                        <!-- Image section -->
                        <div class="w-24 sm:w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                            <img :src="`https://fargona24.uz/storage/${item.photo}`" :alt="item.name"
                                class="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div class="flex-1 ml-3">
                            <h2
                                class="md:text-xl dark:text-white dark:hover:text-slate-200 text-[16px] font-bold text-gray-800 hover:text-gray-700 transition-colors duration-200 line-clamp-2">
                                {{ item.name }}
                            </h2>
                            <div class="flex items-center justify-between mt-1 pr-6">
                                <span class="text-sm text-slate-500 dark:text-slate-300">
                                    {{ item.date }} {{ item.category.name }}
                                </span>
                                <span class="">
                                </span>
                            </div>
                        </div>
                    </router-link>



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