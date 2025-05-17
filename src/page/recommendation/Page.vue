<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import api from '@/services/apiServices'
import { useLangStore } from '@/stores/lang';
import { useRoute } from 'vue-router'
const route = useRoute()
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/vue';

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const props = defineProps<{
    items?: any[]
    title?: string
    apiUrl?: string
    page?: number
    categoryId?: number,
    params?: Record<string, any>
}>()

const store = useLangStore()
const dataItems = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchData = async () => {
    if (!props.apiUrl) return
    loading.value = true
    error.value = null

    try {
        const queryParams = {
            lang: store.lang,
            ...(props.params || {})
        }
        const queryString = new URLSearchParams(queryParams).toString()
        const url = `${props.apiUrl}?${queryString}`

        const response = await api.get(url)
        dataItems.value = response.data
    } catch (e) {
        error.value = 'Ma’lumotlarni yuklashda xatolik yuz berdi'
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    if (props.apiUrl) {
        fetchData()
    } else if (props.items) {
        dataItems.value = props.items
    }
})

watch(
    () => [store.lang, props.apiUrl, props.params, props.items],
    () => {
        if (props.apiUrl) {
            fetchData()
        } else if (props.items) {
            dataItems.value = props.items
        }
    },
    { deep: true }
)

const normalizedItems = computed(() =>
    Array.isArray(props.items)
        ? props.items.map(item => ({
            id: item.id,
            title: item.title || item.name,
            photo: item.photo,
            date: item.date,
            route: item?.title
                ? `/news/r/${item.id}`
                : item?.id
                    ? `/news/n/${item.id}`
                    : `/all-rec?lang=${store.lang}`
        }))
        : []
)
const recLink = computed(() => {
    const selectedCategoryId = localStorage.getItem("selectedCategoryId") ?? "1"
    if (props.categoryId === 1) {
        return '/recpost'
    }
    if (props.categoryId === 2) {
        return `/category/${selectedCategoryId}`
    }
    return ''
})
const mainText = computed(() => {
    if (props.categoryId === 1) {
        if (store.lang === 'uz') return { title: 'Tavsiya etamiz', button: 'Barchasi' };
        if (store.lang === 'ru') return { title: 'Мы рекомендуем', button: 'Ещё ' };
        if (store.lang === 'kr') return { title: 'Тавсия этамиз', button: 'Барчаси' };
        

    } else if (props.categoryId === 2) {
        if (store.lang === 'uz') return { title: 'Mavzuga doir yangiliklar', button: 'Barchasi' };
        if (store.lang === 'ru') return { title: 'Новости по теме', button: 'Ещё ' };
        if (store.lang === 'kr') return { title: 'Мавзуга доир янгиликлар', button: 'Барчаси' };
    }
    return { title: '', button: 'Ko‘rish' ,  }
})

// ✅ Router-link manzilini dinamik aniqlaymiz

const modules = [Autoplay, FreeMode, Pagination];
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();
</script>

<template>
    <div class="max-w-[1250px] mx-auto mt-2 pb-4 ">
        <div class="bg-white dark:bg-gray-800 rounded-xl border-slate-200 p-4">
            <div class="flex justify-between border-b-2 mb-6 dark:border-slate-400 border-[#1a2e42]">
                <h1 class="text-2xl font-bold pb-1 dark:text-slate-200 text-[#1a2e42]">
                    {{ mainText?.title }}
                </h1>
                <div class="text-left mt-2 cursor-pointer">
                    <router-link :to="recLink"
                        class="py-1 flex text-gray-800 dark:text-slate-200 cursor-pointer rounded-md transition-colors duration-200 font-medium">
                        {{ mainText?.button }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            class="fill-[#1a2e42] dark:fill-slate-200" viewBox="0 0 24 24">
                            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z" />
                        </svg>
                    </router-link>
                </div>
            </div>

            <Swiper class="mySwiper" :modules="modules" :slides-per-view="1" :loop="true"
                :autoplay="{ delay: 3500, disableOnInteraction: false }" :space-between="20" :free-mode="true"
                :pagination="{ clickable: true, dynamicBullets: true }"
                :breakpoints="{ 640: { slidesPerView: 1.5 }, 768: { slidesPerView: 3 } }">
                <SwiperSlide v-for="(item, index) in normalizedItems" :key="index"
                    class="relative rounded-2xl overflow-hidden shadow-sm group h-60 sm:h-56">
                    <img :src="`https://fargona24.uz/storage/${item.photo}`" :alt="item.title"
                        class="w-full h-60 object-cover transition-transform rounded-2xl duration-500 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div class="absolute bottom-0 left-0 w-full p-3">
                            <router-link @click="scrollToTop" :to="item.route" class="block cursor-pointer">
                                <p class="text-white text-sm font-semibold line-clamp-2">
                                    {{ item.title }}
                                </p>
                            </router-link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>
