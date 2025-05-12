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


const recNews = ref<any>()
const store = useLangStore()
const recnewsHandler = async()=>{
    try {
        const response = await api.get(`/rec?lang=${store.lang}`);
        recNews.value = response.data
    } catch (error) {
        console.log(error);
    }
}

watch(
    [() => store.lang, () => route.params.id],
    () => {
        recnewsHandler();
    },
    { immediate: true }
);


onMounted(async()=>{
    await recnewsHandler()
})

const mainText = computed(() => {
    if (store.lang === 'uz') return 'Tavsiya etamiz';
    if (store.lang === 'ru') return 'Мы рекомендуем ';
    if (store.lang === 'kr') return 'Тавсия этамиз';
    return 'Asosiy';
});
const modules = [Autoplay, FreeMode, Pagination];


const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();
</script>

<template>
    <div class="max-w-[1250px] mx-auto p-5 ">
        <div class="bg-white  rounded-xl border-slate-200 p-4 ">
            <div class=" flex justify-between border-b-2  mb-6 border-[#1a2e42]">
                <h1 class="text-2xl font-bold  pb-1 text-[#1a2e42] ">{{ mainText }}</h1>
                <div class="text-left mt-2 cursor-pointer">
                    <router-link :to="`/recpost`"
                        class=" py-1 flex  text-gray-800 cursor-pointer rounded-md transition-colors duration-200 font-medium">
                        Yana ko'rish
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1a2e42"
                            viewBox="0 0 24 24">
                            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z" />
                        </svg>
                    </router-link>
                </div>
            </div>
            
            <Swiper  class="mySwiper" :modules="modules" :slides-per-view="1" :loop="true"
                :autoplay="{ delay: 3500, disableOnInteraction: false }" :space-between="20" :free-mode="true"
                :pagination="{ clickable: true, dynamicBullets: true }" :breakpoints="{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 3 }
                }">
                <SwiperSlide v-for="(item, index) in recNews" :key="index"
                    class="relative rounded-sm overflow-hidden shadow-sm group h-60 sm:h-56">
                    <img :src="`https://fargona24.uz/storage/${item.photo}`" :alt="item.title"
                        class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div class="absolute bottom-0 left-0 w-full p-3">
                        <router-link :to="`/news/r/${item.id}`" class="block cursor-pointer">
                            <p class="text-white text-sm font-semibold line-clamp-2">{{ item.title }}</p>
                        </router-link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>
