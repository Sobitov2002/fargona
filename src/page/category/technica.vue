<script setup lang="ts">
import { getSocialNews } from './service'
import { onMounted, ref, computed } from 'vue'

// Define proper typing for your data
interface CategoryItem {
    id: number
    name: string
    date: string
    info: string
    photo: string
}


const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
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

onMounted(async () => {
    try {
        const response = await getSocialNews()
        categories.value = response.data
        console.log('Categories loaded:', categories.value)
        loading.value = false
    } catch (err) {
        console.error('Failed to fetch categories:', err)
        error.value = 'Failed to load categories'
        loading.value = false
    }
})
</script>

<template>
    <div class="max-w-7xl mx-auto p-5">
        <div v-if="loading" class="text-center py-10">
            <div class="text-lg">Loading categories...</div>
        </div>

        <div v-else-if="error" class="text-center py-10">
            <div class="text-lg text-red-600">{{ error }}</div>
        </div>

        <div v-else>
            <h1 class="text-2xl font-bold mb-6 border-b pb-1">Texnalogiya</h1>

            <div v-if="categories.length === 0" class="text-center py-10 text-lg">
                No categories found
            </div>

            <div v-else>
                <div class="grid md:grid-cols-2 gap-1">
                    <div v-for="category in visibleCategories" :key="category.id"
                        class="flex-none bg-white rounded-sm overflow-hidden transition-transform shadow-sm hover:shadow-md">

                        <div class="flex h-full">

                            <div v-if="category.photo" class="w-1/3 flex-shrink-0">
                                <img :src="`https://fargona24.uz/storage/${category.photo}`" :alt="category.name"
                                    class="w-full h-full object-cover">
                            </div>

                            <div class="w-2/3 p-4">
                                <h2 class="text-lg font-bold mb-1 line-clamp-2">{{ category.name }}</h2>
                                <div class="text-xs text-gray-600 mb-2">{{ category.date }}</div>
                                <div class="text-sm text-gray-800 leading-relaxed line-clamp-3"
                                    v-html="category.info.substring(0, 80) + '...'"></div>
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