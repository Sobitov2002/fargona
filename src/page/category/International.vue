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
    itemsToShow.value = categories.value.length
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
loading.value = false
</script>
<template>
    <div class="max-w-[1250px]  mx-auto p-5">
        <div v-if="loading" class="text-center py-10">

        </div>


        <div v-else>


            <div v-if="categories.length === 0" class="text-center py-10 text-lg grid grid-cols-2">
                <div v-for="n in 4" :key="n" class=" transition-transform mb-4 bg-white p-4">
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

            <div v-else class="bg-white  rounded-xl border-slate-200 p-4 ">
                <div class=" flex justify-between border-b-2  mb-6 border-[#1a2e42]">
                    <h1 class="text-2xl font-bold  pb-1 text-[#1a2e42] ">Xalqaro</h1>
                    <div class="text-left mt-2 cursor-pointer">
                        <button @click="showAllItems"
                            class=" py-1 flex  text-gray-800 cursor-pointer rounded-md transition-colors duration-200 font-medium">
                            Yana ko'rish
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1a2e42"
                                viewBox="0 0 24 24">
                                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-3 ">

                    <div v-for="category in visibleCategories" :key="category.id"
                        class="flex-none  overflow-hidden transition-transform ">
                        <div class="flex h-full cursor-pointer">
                            <div v-if="category.photo" class="w-1/4  flex-shrink-0">
                                <img :src="`https://fargona24.uz/storage/${category.photo}`" :alt="category.name"
                                    class="w-full h-30 rounded-xl object-cover">
                            </div>
                            <div class="w-2/3 p-2">

                                <div>
                                    <router-link :to="`/new/${category.id}`" class="block cursor-pointer">
                                        <h2
                                            class="lg:text-xl text-lg font-bold mb-1 line-clamp-2 items-center text-gray-800 hover:text-gray-700">
                                            {{ category.name
                                            }}</h2>
                                    </router-link>
                                    <p class="text-sm text-gray-800">{{ category.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div v-if="hasMoreItems" class="text-left mt-2 cursor-pointer">
                    <button @click="showAllItems"
                        class=" py-1   text-gray-800 cursor-pointer rounded-md transition-colors duration-200 font-medium">
                        Yana ko'rish...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>