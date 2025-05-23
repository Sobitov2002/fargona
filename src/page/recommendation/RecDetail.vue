<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import { categorydetail } from './services'
import { Skeleton } from '@/components/ui/skeleton'

interface Category {
    id: number
    title: string
    date?: string
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


const postDetail = async (pageNum: number) => {
    try {
        const response = await categorydetail( pageNum)
        detailPost.value = response
        // console.log("Detail data:", response)
    } catch (error) {
        console.error("Error fetching detail:", error)
    }
}

const mainText = computed(() => {
    if (route.params.id === '1') return 'Fan  texnika';
    if (route.params.id === '2') return 'Jamiyat';
    if (route.params.id === '3') return 'Jahon';
    if (route.params.id === '4') return 'Nuqtai nazar';
    if (route.params.id === '5') return 'Sport';
});

const loadPage = async (pageNum: number) => {
    const id = route.params.id as string
    page.value = pageNum
    await postDetail( pageNum)
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
                <div v-for="n in 4" :key="n" class="transition-transform mb-4 bg-white p-4">
                    <div class="flex justify-between h-full cursor-pointer">
                        <div class="w-1/4 flex-shrink-0">
                            <Skeleton class="w-full bg-gray-300 h-30 rounded-xl" />
                        </div>
                        <div class="w-2/3 p-2 space-y-2">
                            <Skeleton class="h-6 bg-gray-300 w-3/4 rounded" />
                            <Skeleton class="h-4 w-1/2 bg-gray-300 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="bg-white dark:bg-slate-800 rounded-xl border-slate-200 p-4">
                <div class="flex justify-between border-b-2 mb-6 border-[#1a2e42]">
                    <h1 class="text-2xl font-bold pb-1 text-[#1a2e42]">{{ mainText }}</h1>
                </div>

                <div class="grid md:grid-cols-2 gap-3">
                    <div v-for="category in detailPost.data" :key="category.id"
                        class="flex-none overflow-hidden transition-transform">
                        <div class="flex h-full cursor-pointer">
                            <div v-if="category.photo" class="w-1/4 flex-shrink-0">
                                <img :src="`https://fargona24.uz/storage/${category.photo}`"  loading="lazy"
                                    :alt="category.title" class="w-full h-30 rounded-xl object-cover">
                            </div>
                            <div class="w-2/3 p-2">
                                <router-link :to="`/news/r/${category.id}`" class="block cursor-pointer">
                                    <h2
                                        class="lg:text-xl text-lg font-bold mb-1 line-clamp-2 text-gray-800 dark:text-slate-200 hover:text-gray-700 dark:hover:text-white">
                                        {{ category.title }}
                                    </h2>
                                </router-link>
                                <p class="text-sm text-gray-800 dark:text-slate-200">{{ category.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex justify-center mt-6 space-x-2">
                    <button @click="loadPage(page - 1)" :disabled="page === 1"
                        class="px-3 dark:text-slate-200 py-1 border cursor-pointer rounded disabled:opacity-50">Orqaga</button>

                    <button v-for="p in detailPost.last_page" :key="p" @click="loadPage(p)"
                        :class="['px-3 py-1  rounded', { 'bg-blue-500 dark:bg-slate-900 text-white dark:text-slate-200 ': p === page }]">
                        {{ p }}
                    </button>

                    <button @click="loadPage(page + 1)" :disabled="page === detailPost.last_page"
                        class="px-3 dark:text-slate-200 py-1 border cursor-pointer rounded disabled:opacity-50">Oldinga</button>
                </div>
            </div>
        </div>
    </div>
</template>
