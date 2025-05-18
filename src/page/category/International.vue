<script setup lang="ts">
import { getInternationalNews } from './service'
import { onMounted, ref, computed ,watch } from 'vue'
import { Skeleton } from "@/components/ui/skeleton"
import { useLangStore } from '@/stores/lang'

const store = useLangStore()



interface CategoryItem {
    id: number
    name: string
    date: string
    info: string
    photo: string
}

const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const itemsToShow = ref(6) 


const visibleCategories = computed(() => {
    return categories.value.slice(0, itemsToShow.value)
})


const hasMoreItems = computed(() => {
    return categories.value.length > itemsToShow.value
})

const showAllItems = () => {
    
}

const getInnews = async ()=> {
    try {
        const response = await getInternationalNews()
        categories.value = response.data
    } catch (err) {
        console.error('Failed to fetch categories:', err)
        loading.value = false
    }
}
watch(() => store.lang, async () => {
    await getInnews()
})
onMounted(async () => {
    await getInnews()
})

const mainText = computed(() => {
    if (store.lang === 'uz') {
        return {
            title: 'Jahon',
            button: 'Barchasi'
        };
    }
    if (store.lang === 'ru') {
        return {
            title: 'Мир',
            button: 'Ещё '
        };
    }
    if (store.lang === 'kr') {
        return {
            title: 'Жаҳон',
            button: 'Барчаси'
        };
    }
});
const handleClick = () => {
    localStorage.setItem('selectedCategoryId', '3')
}
loading.value = false
</script>
<template>
    <div class="max-w-[1250px] mx-auto p-5">
        <div v-if="loading" class="text-center py-10">

        </div>
        <div v-else>
            <div v-if="categories.length === 0" class="text-center py-10 text-lg grid grid-cols-2">
                <div v-for="n in 4" :key="n" class=" transition-transform mb-4 bg-white dark:bg-gray-800 p-4">
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

            <div v-else class="bg-white dark:bg-slate-800  rounded-xl border-slate-200 p-4 ">
                <div class=" flex justify-between border-b-2  mb-6 border-[#1a2e42] dark:border-slate-500">
                    <h1 class="text-2xl font-bold   pb-1 text-[#1a2e42] dark:text-slate-200 ">{{ mainText?.title }}</h1>
                    <div class="text-left mt-2 cursor-pointer">
                        <router-link :to="`/category/3`" @click="handleClick"
                            class="py-1 flex text-gray-800 dark:text-slate-200 cursor-pointer rounded-md transition-colors duration-200 font-medium">
                            {{ mainText?.button }}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                class="fill-[#1a2e42] dark:fill-slate-200" viewBox="0 0 24 24">
                                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z" />
                            </svg>
                        </router-link>
                    </div>


                </div>
                <div class="grid md:grid-cols-2 gap-3 ">

                    <div v-for="category in visibleCategories" :key="category.id"
                        class="flex-none  overflow-hidden transition-transform ">
                        <div class="flex h-full cursor-pointer">
                            <div v-if="category.photo" class="w-1/4  flex-shrink-0">
                                <img :src="`https://fargona24.uz/storage/${category.photo}`" :alt="category.name"
                                    class="w-full md:h-30 h-22 rounded-xl object-cover" loading="lazy">
                            </div>
                            <div class="w-2/3 p-2">
                                <router-link :to="`/news/n/${category.id}`" class="block cursor-pointer">
                                    <h2
                                        class="lg:text-xl text-[16px] text-lg font-bold mb-1 line-clamp-2 items-center dark:text-slate-200 text-gray-800 hover:text-gray-700 dark:hover:text-white">
                                        {{ category.name
                                        }}</h2>
                                </router-link>
                                <p class="text-sm text-gray-800 dark:text-slate-300">{{ category.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>