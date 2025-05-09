<script setup lang="ts">
import { newsdetail } from './services'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {  FacebookIcon } from 'lucide-vue-next'
import { useLangStore } from '@/stores/lang'
import Course from '@/components/course/Course.vue'

const store = useLangStore()
const detailPost = ref<any>(null)
const route = useRoute()

const postDetail = async (id: string) => {
    try {
        detailPost.value = await newsdetail(id)
        console.log(detailPost.value)
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    const id = route.params.id as string
    await postDetail(id)
})

watch(() => store.lang, async () => {
    const id = route.params.id as string
    await postDetail(id)
}, { immediate: true })
</script>

<template>
    <div class="max-w-6xl mx-auto mb-4">
        <Course />
    </div>
    <div class="max-w-6xl mx-auto bg-white rounded-xl">
        <!-- Article Container -->
        <article v-if="detailPost" class="p-4 md:p-6">
            <!-- Article Header -->
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {{ detailPost.name }}
            </h1>
            <!-- Article Meta -->
            <div class="flex items-center gap- text-sm text-gray-500 mb-4">
                <span class="flex items-center">
                    {{ detailPost.date }}/
                </span>
                <span class="flex items-center gap-1">
                    <svg class="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span>{{ detailPost.views?.count || 0 }} </span>
                </span>
            </div>
            <!-- Article Image -->
            <div v-if="detailPost.photo" class="mb-6 flex justify-center">
                <img :src="`https://fargona24.uz/storage/${detailPost.photo}`" :alt="detailPost.name"
                    class=" w-full h-[650px] rounded-xl ">
            </div>
            <!-- Article Content -->
            <div class="prose prose-lg max-w-none  " v-html="detailPost.info"></div>
            <div v-if="detailPost.category" class="flex flex-wrap gap-2 mt-6">
                <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {{ detailPost.category }}
                </span>
            </div>
            <!-- Social Share -->
            <div class="flex gap-2 mt-6">
                <button class="p-2 bg-blue-500 text-white  rounded-full hover:bg-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5 items-center"
                        viewBox="0 0 24 24">
                        <path
                            d="M22.162 2.73L2.588 10.29c-1.205.457-1.197 1.1-.22 1.385l5.053 1.577 1.936 6.147c.24.736.423 1.022 1.07 1.022.698 0 1.004-.322 1.398-.707l3.36-3.263 4.95 3.645c.91.5 1.56.24 1.788-.846l3.24-15.18c.3-1.42-.543-2.072-1.995-1.27z" />
                    </svg>
                </button>
                <button class="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                    <FacebookIcon class="w-5 h-5" />
                    <span class="sr-only">Share on Twitter</span>
                </button>
            </div>
        </article>

        <!-- Loading state -->
        <div v-else class="p-4 md:p-6 flex justify-center items-center min-h-[400px]">
           <div>
           
           </div>
        </div>
    </div>
</template>

<style>
/* Additional styles for article content */
.prose a {
    color: #3b82f6;
    text-decoration: underline;
}

.prose a:hover {
    color: #2563eb;
}

/* For proper rendering of HTML content */
.prose p {
    margin-bottom: 1rem;
}

.prose blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
}

.prose img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
}

.prose figure {
    margin: 1.5rem 0;
}
</style>