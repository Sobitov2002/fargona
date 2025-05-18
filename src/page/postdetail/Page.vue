<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import Course from '@/components/course/Course.vue'
import Recommendation from '@/page/recommendation/Page.vue'
import { useHead } from '@vueuse/head'
import { newsdetail, fetchAllRec, fetchLastNewsCategory } from './services'

const store = useLangStore()
const detailPost = ref<any>(null)
const route = useRoute()
const currentUrl = window.location.href
const shareLink = ref<string>('')
const tags = ref('')
const tagsArray = ref<string[]>([])

const darkMode = ref(false)

// Boshlang'ich qiymatni olish
onMounted(() => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
        darkMode.value = stored === 'true'
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'darkMode') {
            darkMode.value = event.newValue === 'true'
        }
    })
})

// Computed class
const contentClass = computed(() =>
    darkMode.value ? 'news-content dark-content' : 'news-content'
)

// darkMode ni kuzatish va localStorage ga yozish
watch(darkMode, (newVal) => {
    localStorage.setItem('darkMode', newVal.toString())
})

useHead({
    title: "Farg'ona24 - Fargonadagi eng tezkor yangiliklar olami",
    meta: [
        {
            name: 'description',
            content:
                "Farg'ona24 - Fargonadagi eng tezkor yangiliklar olami. Farg'ona yangiliklar, Fargona tezkor",
        },
        {
            name: 'keywords',
            content: 'Farg\'ona, Farg\'ona yangiliklari, yangiliklar, tezkor xabarlar',
        },
        {
            property: 'og:title',
            content: 'Farg\'ona 24 | Bosh sahifa',
        },
        {
            property: 'og:image',
            content: 'https://ik.imagekit.io/vtroph5l9/Product/logotip.jpg?updatedAt=1746790238401',
        },
        {
            property: 'og:url',
            content: 'https://fargona24.uz/',
        },
    ],
})

const allRecData = ref<{ data: any[] } | null>(null)

const lastNewsCategoryData = ref<any[]>([])

const loadAllRec = async () => {
    allRecData.value = await fetchAllRec(1)
}

const loadLastNewsCategory = async () => {
    lastNewsCategoryData.value = await fetchLastNewsCategory()
}

const processTelegramLinks = (container: HTMLElement) => {
    if (!container) return

    const dark = localStorage.getItem('darkMode') === 'true'

    const regex = /##tgpostlink=([\w\d_/-]+)##/g
    const html = container.innerHTML
    let match
    const fragments: (string | HTMLElement)[] = []

    let lastIndex = 0

    while ((match = regex.exec(html)) !== null) {
        const before = html.slice(lastIndex, match.index)
        fragments.push(before)

        const script = document.createElement('script')
        script.async = true
        script.src = 'https://telegram.org/js/telegram-widget.js?7'
        script.setAttribute('data-telegram-post', match[1])
        script.setAttribute('data-width', '100%')
        script.setAttribute('data-userpic', 'false')
        fragments.push(script)

        lastIndex = regex.lastIndex
    }

    fragments.push(html.slice(lastIndex))

    container.innerHTML = ''
    fragments.forEach((el) => {
        if (typeof el === 'string') {
            container.insertAdjacentHTML('beforeend', el)
        } else {
            container.appendChild(el)
        }
    })

    setTimeout(() => {
        const iframes = container.querySelectorAll('iframe')
        iframes.forEach((iframe) => {
            iframe.setAttribute('height', '600')
            iframe.style.height = '530px'

            // backgroundColor iframe ichida ishlamasligi mumkin, lekin container uchun:
            const containerDiv = iframe.parentElement
            if (containerDiv) {
                containerDiv.style.backgroundColor = dark ? '#1e293b' : '#e2e8f0'
            }
        })
    }, 500)
}


const postDetail = async (type: 'n' | 'r', id: string) => {
    try {
        detailPost.value = await newsdetail(type, id)
        tags.value = detailPost.value.tags
        tagsArray.value = tags.value ? tags.value.split(',') : []

        nextTick(() => {
            const contentElement = document.querySelector('.news-content') as HTMLElement
            if (contentElement) {
                processTelegramLinks(contentElement)
            }
        })
    } catch (error) {
        console.error(error)
    }
}

const telegramShare = async (type: 'n' | 'r', id: string) => {
    shareLink.value = `https://fargona24.uz/${type}/${id}`
}

onMounted(async () => {
    const type = route.params.type as 'n' | 'r'
    const id = route.params.id as string
    await postDetail(type, id)
    await telegramShare(type, id)
    await loadAllRec()
    await loadLastNewsCategory()
})

watch(
    [() => store.lang, () => route.params.type, () => route.params.id],
    async () => {
        const type = route.params.type as 'n' | 'r'
        const id = route.params.id as string
        await postDetail(type, id)
        await telegramShare(type, id)
        await loadAllRec()
        await loadLastNewsCategory()
    },
    { immediate: true }
)

const mainText = computed(() => {
  if (store.lang === 'uz') {
    return { title: 'Teglar' }
  }
  if (store.lang === 'ru') {
    return { title: 'Теги' }
  }
  if (store.lang === 'kr') {
    return { title: 'Теглар' }
  }
  return { title: '' } // default qiymat
})

</script>

<template>
    <div class="px-4 nd:px-0">
        <div class="max-w-[1200px] mx-auto mb-4">
            <Course />
        </div>
        <div class="max-w-[1200px] mx-auto bg-white dark:bg-gray-800 rounded-xl">
            <!-- Article Container -->
            <article v-if="detailPost" class="p-4 md:p-">
                <!-- Article Header -->
                <div class=" sticky top-24 bottom-0 hidden   sm:flex flex-col gap-3 float-left mr-4 ">
                    <!-- Telegram Icon -->
                    <a :href="`https://t.me/share/url?url=${shareLink}`" target="_blank" rel="noopener noreferrer"
                        class="  flex justify-center items-center  transition">
                        <i class="fa-brands fa-telegram text-4xl text-blue-600 "></i>
                    </a>
                    <!-- Facebook Icon -->
                    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                        target="_blank" rel="noopener noreferrer"
                        class="p-2 text-white dark:text-slate-200  lex justify-center items-center  transition">
                        <i class="fa-brands fa-facebook text-4xl text-blue-600 "></i>
                    </a>
                </div>
                <h1 class="text-2xl md:text-3xl font-bold dark:text-slate-200 text-gray-800 mb-4">
                    {{ detailPost.name }}
                </h1>
                <!-- Article Meta -->
                <div class="flex items-center gap- text-sm text-gray-500 mb-4">
                    <span v-if="detailPost.date" class="flex items-center">
                        {{ detailPost.date }} /
                    </span>

                    <span v-if="detailPost.views" class="flex items-center gap-1">
                        <svg class="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2"
                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span>{{ detailPost.views?.count || 0 }} </span>
                    </span>
                    <span v-if="detailPost.category" class="px-1 py-1 text-md font-medium  text-gray-500 rounded-full">
                        / {{ detailPost.category?.name }}
                    </span>
                </div>
                <!-- Article Image -->
                <div v-if="detailPost.photo" class="mb-6  sm:ml-12  flex justify-center">
                    <img :src="`https://fargona24.uz/storage/${detailPost.photo}`" :alt="detailPost.name"
                        class=" w-full md:h-[650px] h-[400px] sm:ml-4 rounded-xl " loading="lazy">
                </div>
                <!-- Instead of using a custom directive, we'll just use v-html and process it after render -->
                <div :class="contentClass" class="sm:ml-12 " v-html="detailPost.info"></div>

                <!-- Tags Content -->
                <div
                    class="flex sm:ml-12 flex-wrap gap-3 p-4 bg-white dark:bg-gray-800 dark:text-slate-200 rounded-lg ">
                    {{ mainText.title }}:
                    <span v-for="(tag, index) in tagsArray" :key="index"
                        class="inline-flex items-center bg-slate-100 text-gray-800 dark:bg-slate-900 dark:text-slate-200 text-sm font-semibold px-4 py-1 rounded-xl shadow-lg cursor-default select-none transition-transform transform hover:scale-110 hover:shadow-2xl">
                        #{{ tag }}
                    </span>
                </div>
                <!-- Social Share -->
                <div class="flex items-center mt-6 sm:hidden">
                    <!-- Telegram Icon -->
                    <span class="flex gap-2">
                        <a :href="`https://t.me/share/url?url=${shareLink}`" target="_blank" rel="noopener noreferrer"
                            class="p-2  text-white rounded-full flex justify-center  items-center transition-colors">
                            <i class="fa-brands fa-telegram text-4xl text-blue-600 hover:text-blue-500 "></i>
                        </a>

                        <!-- Facebook Icon -->
                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                            target="_blank" rel="noopener noreferrer"
                            class="p-2  text-white flex justify-center  items-center rounded-full transition-colors">
                            <i class="fa-brands fa-facebook text-4xl text-blue-600 hover:text-blue-500 "></i>
                        </a>
                    </span>
                </div>
            </article>
            <!-- Loading state -->
            <div v-else class="p-4 md:p-6 flex justify-center items-center min-h-[400px]">

            </div>
        </div>
        <div class="max-w-[1250px] mx-auto lg:p-6">
            <Recommendation v-if="allRecData" :items="allRecData.data" :categoryId="1"
                title="Barcha tavsiya etilgan yangiliklar" />
            <Recommendation :items="lastNewsCategoryData" :categoryId="2"
                title="So‘nggi yangiliklar kategoriya bo‘yicha" />
        </div>
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
   
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark mode styles for news content */
.dark-content {
    background-color: #1e293b;
    /* slate-800 */
    color: #e2e8f0;
    /* slate-200 */
    
}

/* Dark mode styles for links */
.dark-content a {
    color: #60a5fa;
    /* blue-400 */
}

.dark-content a:hover {
    color: #93c5fd;
    /* blue-300 */
}

/* Dark mode styles for blockquotes */
.dark-content blockquote {
    background: #0f172a;
    /* slate-900 */
    border-left: 6px solid #1e40af;
    /* blue-800 */
    color: #cbd5e1;
    /* slate-300 */
}

.dark-content blockquote::before,
.dark-content blockquote::after {
    color: #1e40af;
    /* blue-800 */
}

/* Dark mode styles for code */
.dark-content pre {
    background-color: #0f172a;
    /* slate-900 */
}

.dark-content code {
    background-color: #1e293b;
    /* slate-800 */
}

/* Dark mode styles for tables */
.dark-content th {
    background-color: #1e293b;
    /* slate-800 */
}

.dark-content th,
.dark-content td {
    border: 1px solid #334155;
    /* slate-700 */
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

.dark-content a[href*="t.me"],
.dark-content a[href*="telegram.me"] {
    color: #e2e8f0;
    /* slate-200 */
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

.dark-content a[href*="facebook.com"] {
    color: #e2e8f0;
    /* slate-200 */
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

.dark-content h1 {
    color: #f1f5f9;
    /* slate-100 */
    border-bottom: 2px solid #334155;
    /* slate-700 */
}

.news-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.2rem 0 0.8rem;
    color: #1f2937;
}

.dark-content h2 {
    color: #f1f5f9;
    /* slate-100 */
}

.news-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.6rem;
    color: #374151;
    /* gray-700 */
}

.dark-content h3 {
    color: #e2e8f0;
    /* slate-200 */
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
    position: relative;
    border-left: 6px solid #063377;
    background: #f9fafb;
    padding: 2rem 2rem;
    margin: 2rem 0;
    font-style: italic;
    color: #374151;
    /* Tailwind gray-700 */
    font-size: 1rem;
    line-height: 1.75rem;
    border-radius: 0.5rem;
}

.news-content blockquote::before {
    content: "“";
    /* Ochuvchi qo‘shtirnoq */
    font-size: 4rem;
    color: #063377;
    position: absolute;
    top: -20px;
    left: 10px;
    font-family: Georgia, serif;
    line-height: 1;
}

.news-content blockquote::after {
    content: "”";
    /* Yopuvchi qo‘shtirnoq */
    font-size: 4rem;
    color: #063377;
    position: absolute;
    bottom: -20px;
    right: 20px;
    font-family: Georgia, serif;
    line-height: 1;
}

.dark-content blockquote {
    position: relative;
    border-left: 6px solid #aeaeae;
    background: #374151;
    padding: 2rem 2rem;
    margin: 2rem 0;
    font-style: italic;
    color: #e2e8f0;
    /* Tailwind gray-700 */
    font-size: 1rem;
    line-height: 1.75rem;
    border-radius: 0.5rem;
}
.dark-content blockquote::before {
    content: "“";
    /* Ochuvchi qo‘shtirnoq */
    font-size: 4rem;
    color: #aeaeae;
    position: absolute;
    top: -20px;
    left: 10px;
    font-family: Georgia, serif;
    line-height: 1;
}

.dark-content blockquote::after {
    content: "”";
    /* Yopuvchi qo‘shtirnoq */
    font-size: 4rem;
    color: #aeaeae;
    position: absolute;
    bottom: -20px;
    right: 20px;
    font-family: Georgia, serif;
    line-height: 1;
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

.dark-content hr {
    border-top: 1px solid #334155;
    /* slate-700 */
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

.dark-content .tags {
    border-top: 1px dashed #334155;
    /* slate-700 */
}

.news-content .tags span.label {
    font-weight: 600;
    color: #6b7280;
    /* gray-500 */
}

.dark-content .tags span.label {
    color: #94a3b8;
    /* slate-400 */
}

.news-content .tags .tag {
    background-color: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.75rem;
    font-size: 14px;
    border-radius: 20px;
    transition: background 0.3s;
}

.dark-content .tags .tag {
    background-color: #334155;
    /* slate-700 */
    color: #e2e8f0;
    /* slate-200 */
}

.news-content .tags .tag:hover {
    background-color: #e5e7eb;
}

.dark-content .tags .tag:hover {
    background-color: #475569;
    /* slate-600 */
}
</style>