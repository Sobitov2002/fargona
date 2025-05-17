<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import { categorydetail } from './services'
import { Skeleton } from '@/components/ui/skeleton'

interface Category {
    id: number
    name: string
    date: string
    photo?: string
}

interface CategoryDetailResponse {
    data: Category[]
    current_page: number
    last_page: number
    [key: string]: any
}

const store = useLangStore()
const detailPost = ref<CategoryDetailResponse | null>(null)
const route = useRoute()
const page = ref(1)


const postDetail = async (id: string, pageNum = 1) => {
    try {
        const response = await categorydetail(id, pageNum)
        detailPost.value = response
        console.log("Detail data:", response)
    } catch (error) {
        console.error("Error fetching detail:", error)
    }
}

const mainText = computed(() => {
    const lang = store.lang as 'uz' | 'ru' | 'kr';
    const id = route.params.id as '1' | '2' | '3' | '4' | '5'; 

    const idToKey: Record<'1' | '2' | '3' | '4' | '5', 'science' | 'society' | 'world' | 'opinion' | 'sport'> = {
        '1': 'science',
        '2': 'society',
        '3': 'world',
        '4': 'opinion',
        '5': 'sport'
    };

    const translations: Record<'uz' | 'ru' | 'kr', Record<'science' | 'society' | 'world' | 'opinion' | 'sport', string>> = {
        uz: {
            science: 'Fan texnika',
            society: 'Jamiyat',
            world: 'Jahon',
            opinion: 'Nuqtai nazar',
            sport: 'Sport'
        },
        ru: {
            science: 'Наука и техника',
            society: 'Общество',
            world: 'Мир',
            opinion: 'Точка зрения',
            sport: 'Спорт'
        },
        kr: {
            science: 'Фан ва техника',
            society: 'Жамият',
            world: 'Жахон',
            opinion: 'Нуқтаи назар',
            sport: 'Спорт'
        }
    };

    const key = idToKey[id];
    return translations[lang][key];
});



const loadPage = async (pageNum: number) => {
    const id = route.params.id as string
    page.value = pageNum
    await postDetail(id, pageNum)
}

onMounted(() => {
    loadPage(page.value)
})

watch([() => store.lang, () => route.params.id], () => {
    loadPage(1)
})
</script>

<template>
    <div class="max-w-[1250px] mx-auto p-5">
        <div>
            <div v-if="!detailPost || !detailPost.data || detailPost.data.length === 0"
                class="text-center py-10 text-lg grid md:grid-cols-2">
                <div v-for="n in 4" :key="n" class="transition-transform mb-4 bg-white dark:bg-gray-800 p-4">
                    <div class="flex justify-between h-full cursor-pointer">
                        <div class="w-1/4 flex-shrink-0">
                            <Skeleton class="w-full bg-gray-300 dark:bg-gray-700 h-30 rounded-xl" />
                        </div>
                        <div class="w-2/3 p-2 space-y-2">
                            <Skeleton class="h-6 bg-gray-300 dark:bg-gray-700 w-3/4 rounded" />
                            <Skeleton class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="bg-white dark:bg-gray-800 rounded-xl border-slate-200 p-4">
                <div class="flex justify-between border-b-2 mb-6 border-[#1a2e42] dark:border-slate-500">
                    <h1 class="text-2xl font-bold pb-1 text-[#1a2e42] dark:text-slate-200">{{ mainText }}</h1>
                </div>
                <div class="grid md:grid-cols-2 gap-3">
                    <div v-for="category in detailPost.data" :key="category.id"
                        class="flex-none overflow-hidden transition-transform">
                        <div class="flex h-full cursor-pointer">
                            <div v-if="category.photo" class="w-1/4 flex-shrink-0">
                                <img :src="`https://fargona24.uz/storage/${category.photo}`" :alt="category.name"
                                    class="w-full md:h-30 h-22 rounded-xl object-cover">
                            </div>
                            <div class="w-2/3 p-2">
                                <router-link :to="`/news/n/${category.id}`" class="block cursor-pointer">
                                    <h2
                                        class="lg:text-xl dark:hover:text-white text-[16px] dark:text-slate-200 text-lg font-bold mb-1 line-clamp-2 text-gray-800 hover:text-gray-700">
                                        {{ category.name }}
                                    </h2>
                                </router-link>
                                <p class="text-sm text-gray-800 dark:text-slate-200">{{ category.date }} {{ mainText }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex justify-center mt-6 space-x-2">
                    <button @click="loadPage(page - 1)" :disabled="page === 1"
                        class="px-3 py-1 border cursor-pointer rounded disabled:opacity-50">
                        <svg class="w-6 h-6 text-gray-800 dark:text-slate-200 " aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    <button v-for="p in detailPost.last_page" :key="p" @click="loadPage(p)"
                        :class="['px-3 py-1 border rounded', { 'bg-blue-500 dark:bg-gray-900 dark:border-none text-white': p === page }]">
                        {{ p }}
                    </button>
                    <button @click="loadPage(page + 1)" :disabled="page === detailPost.last_page"
                        class="px-3 py-1 border rounded cursor-pointer disabled:opacity-50">
                        <svg class="w-6 h-6 text-gray-800 dark:text-slate-200 " aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
