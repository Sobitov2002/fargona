<script setup lang="ts">
import { newsdetail } from './services'
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import Course from '@/components/course/Course.vue'
import { FacebookIcon } from 'lucide-vue-next'
import Recomundation from '@/page/recommendation/Page.vue'
import { Skeleton } from '@/components/ui/skeleton'
const store = useLangStore()
const detailPost = ref<any>(null)
const route = useRoute()

// Define the custom directive
const vTelegramPosts = {
    mounted(el: HTMLElement) {
        processTelegramLinks(el)
    },
    updated(el: HTMLElement) {
        processTelegramLinks(el)
    }
}

//Get telegram widjet

const processTelegramLinks = (container: HTMLElement) => {
    if (!container) return

    const regex = /##tgpostlink=([\w\d_/-]+)##/g
    const html = container.innerHTML
    let match
    const fragments: (string | HTMLElement)[] = []

    let lastIndex = 0

    while ((match = regex.exec(html)) !== null) {
        const before = html.slice(lastIndex, match.index)
        fragments.push(before)

        // Create Telegram widget script
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://telegram.org/js/telegram-widget.js?7'
        script.setAttribute('data-telegram-post', match[1])
        script.setAttribute('data-width', '100%')

        fragments.push(script)

        lastIndex = regex.lastIndex
    }

    fragments.push(html.slice(lastIndex))

    
    container.innerHTML = ''
    fragments.forEach(el => {
        if (typeof el === 'string') {
            container.insertAdjacentHTML('beforeend', el)
        } else {
            container.appendChild(el)
        }
    })
}

const postDetail = async (type: 'n' | 'r', id: string) => {
    try {
        detailPost.value = await newsdetail(type, id)
        nextTick(() => {
            const contentElement = document.querySelector('.news-content') as HTMLElement
            if (contentElement) {
                processTelegramLinks(contentElement)
            }
        })
    } catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    const type = route.params.type as 'n' | 'r'
    const id = route.params.id as string
    await postDetail(type, id)
})

watch(
    [() => store.lang, () => route.params.type, () => route.params.id],
    async () => {
        const type = route.params.type as 'n' | 'r'
        const id = route.params.id as string
        await postDetail(type, id)
    },
    { immediate: true }
)



</script>

<template>
    <div v-if="!detailPost">
        <Skeleton class="w-[100px] bg-gray-100 h-5 rounded-full" />
    </div>
    <div v-else class="max-w-6xl mx-auto mb-4">
        <Course />
    </div>
    <div v-else class="max-w-6xl mx-auto bg-white rounded-xl">
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
                    class=" w-full md:h-[650px] h-[400px] rounded-xl ">
            </div>
            <!-- Article Content -->
            <!-- Instead of using a custom directive, we'll just use v-html and process it after render -->
            <div class="prose prose-lg max-w-none news-content" v-html="detailPost.info"></div>

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
        <Recomundation />
    </div>
    <div class="max-w-[1250px] mx-auto">
    </div>
</template>

<style>

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

.news-content {
    font-family: 'Helvetica Neue', sans-serif;
    color: #1f2937;
    /* gray-800 */
    line-height: 1.8;
    font-size: 16px;
    word-break: break-word;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Barcha linklar umumiy */
.news-content a {
    color: #2563eb;
    /* blue-600 */
    text-decoration: underline;
    font-weight: 500;
    transition: all 0.3s ease;
    word-break: break-word;
}

/* Hover effekti */
.news-content a:hover {
    color: #1d4ed8;
    /* blue-700 */
    text-decoration: none;
}

/* Telegram link */
.news-content a[href*="t.me"],
.news-content a[href*="telegram.me"] {
    display: inline-block;
    color: #111827;
    padding: 6px 12px;
    border-radius: 8px;
    text-decoration: none;
    margin: 6px 0;
    font-weight: 600;
}


/* Facebook link */
.news-content a[href*="facebook.com"] {
    display: inline-block;
    color: #111827;
    padding: 6px 12px;
    border-radius: 8px;
    text-decoration: none;
    margin: 6px 0;
    font-weight: 600;
}

.news-content a[href*="facebook.com"]:hover {
    background-color: #145ccf;
}

/* Headings */
.news-content h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 1.5rem 0 1rem;
    color: #111827;
    /* gray-900 */
    border-bottom: 2px solid #e5e7eb;
    /* gray-200 */
    padding-bottom: 0.25rem;
}

.news-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.2rem 0 0.8rem;
    color: #1f2937;
}

.news-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.6rem;
    color: #374151;
    /* gray-700 */
}

/* Paragraphs */
.news-content p {
    margin-bottom: 1rem;
}

/* Links */
.news-content a {
    color: #2563eb;
    /* blue-600 */
    text-decoration: underline;
    transition: color 0.2s;
}

.news-content a:hover {
    color: #1d4ed8;
    /* blue-700 */
}

/* Lists */
.news-content ul {
    padding-left: 1.5rem;
    list-style-type: disc;
    margin-bottom: 1rem;
}

.news-content ol {
    padding-left: 1.5rem;
    list-style-type: decimal;
    margin-bottom: 1rem;
}

.news-content li {
    margin-bottom: 0.5rem;
}

/* Images */
.news-content img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 1.5rem 0;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

/* Blockquote */
.news-content blockquote {
    border-left: 4px solid #d1d5db;
    background: #f9fafb;
    padding: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #6b7280;
    /* gray-500 */
}

/* Code */
.news-content pre {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
    font-family: 'Courier New', monospace;
}

.news-content code {
    background-color: #e5e7eb;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
}

/* Tables */
.news-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}

.news-content th,
.news-content td {
    border: 1px solid #d1d5db;
    padding: 0.75rem;
}

.news-content th {
    background-color: #f3f4f6;
    font-weight: 600;
}

/* Horizontal rule */
.news-content hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 2rem 0;
}

/* Video / iframe */
.news-content iframe,
.news-content video {
    width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
}

/* === TAGS section === */
.news-content .tags {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px dashed #e5e7eb;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
}

.news-content .tags span.label {
    font-weight: 600;
    color: #6b7280;
    /* gray-500 */
}

.news-content .tags .tag {
    background-color: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.75rem;
    font-size: 14px;
    border-radius: 20px;
    transition: background 0.3s;
}

.news-content .tags .tag:hover {
    background-color: #e5e7eb;
}
</style>