<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import { searchDetail } from './services'
import { Skeleton } from '@/components/ui/skeleton'


interface NewsItem {
    id: number;
    name: string;
    date: string;
    photo?: string;
    category: {
        id: number;
        name: string;
    };
    category_id: number;
}

interface CategoryDetailResponse {
    
    [key: string]: any
}

const store = useLangStore()
const detailPost = ref<CategoryDetailResponse | null>(null)
const route = useRoute()
const serchText = ref<string>('') 

const postDetail = async (id: string) => {
    try {
        const response = await searchDetail(id)
        detailPost.value = response
        console.log("search data:", response)
    } catch (error) {
        console.error("Error fetching detail:", error)
    }
}


onMounted(async () => {
    const id = route.query.q as string
    serchText.value = id 
    await postDetail(id)
})

watch([() => store.lang, () => route.query.q], async () => {
    const id = route.query.q as string
    serchText.value = id 
    await postDetail(id)
}, { immediate: true })


const idSetcategory = (id: string) => {
    localStorage.setItem('selectedCategoryId', id.toString());
    console.log('Selected category ID saved:', id);
};
</script>

<template>
    <div class="max-w-[1250px] mx-auto p-5">
        <div>
            <div v-if="!detailPost || !detailPost.data || detailPost.data.length === 0"
                class="text-center py-10 text-lg flex justify-center  ">
                <div class="bg-white dark:bg-slate-800 flex items-center justify-center  w-full p-5 h-60">
                    <h1 class="text-2xl   font-bold pb-1 text-[#1a2e42] dark:text-slate-200">{{serchText}} - Bo'yicha
                        ma'lumot topilmadi !
                    </h1>
                </div>
            </div>
            <div v-else class="bg-white dark:bg-slate-800 rounded-xl border-slate-200 p-4">
                <div class="flex justify-between border-b-2 mb-6 border-[#1a2e42] dark:border-slate-200">
                    <h1 class="md:text-2xl text-lg  font-bold pb-1 text-[#1a2e42] dark:text-slate-200">
                        "{{serchText}}"-bo'yicha natijalar
                        soni: {{detailPost.data.length}} </h1>

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
                                <router-link @click.prevent="idSetcategory(category.category.id.toString())"
                                    :to="`/news/n/${category.id}`" class="block cursor-pointer">
                                    <h2
                                        class="lg:text-xl text-lg font-bold mb-1 line-clamp-2 text-gray-800 dark:text-slate-200 dark:hover:text-white hover:text-gray-700">
                                        {{ category.name }}
                                    </h2>
                                </router-link>
                                <p class="text-sm text-gray-800 dark:text-slate-200 ">{{ category.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
