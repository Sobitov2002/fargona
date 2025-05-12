<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import api from '@/services/apiServices';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useLangStore } from '@/stores/lang'
const store = useLangStore()
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Define the type for video items
interface VideoItem {
    id: number;
    name: string;
    link: string;
    image: string;
    date: string;
}

const videoItems = ref<VideoItem[]>([]);
const activeVideoId = ref<string | null>(null);
const showModal = ref(false);

const getYoutubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const playVideo = (videoLink: string) => {
    activeVideoId.value = getYoutubeVideoId(videoLink);
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    activeVideoId.value = null;
};



const videoHendler = async ()=>{
    try {
        const response = await api.get(`/last-podcasts?lang=${store.lang}`);
        videoItems.value = response.data;        
    } catch (error) {
        console.error('Error fetching video news:', error);
    }
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && showModal.value) {
            closeModal();
        }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
        window.removeEventListener('keydown', handleEscape);
    };

}
watch(() => store.lang, async () => {
    await videoHendler()
})

onMounted(async() => {
   await videoHendler()
});
const mainText = computed(() => {
    if (store.lang === 'uz') return 'Podcast va Interviyu';
    if (store.lang === 'ru') return 'Подкаст и интервью';
    if (store.lang === 'kr') return 'Подкаст ва интервью';
    return 'Asosiy';
});
</script>

<template>
    <div class="bg-[#173044]">
        <div class="  max-w-[1250px]  w-full mx-auto p-5">
            <h2 class="text-2xl font-bold text-white mb-3 border-b py-2">{{ mainText }}</h2>
            <swiper :modules="[Autoplay, FreeMode, Pagination]" :slides-per-view="1" :loop="true" :autoplay="{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }" :space-between="20" :free-mode="true" :pagination="{
                clickable: true,
                dynamicBullets: true
            }" :breakpoints="{
            640: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }" class="mySwiper ">
                <swiper-slide v-for="item in videoItems" :key="item.id"
                    class="relative  overflow-hidden rounded-2xl  group px-4 md:px-0 h-60 sm:h-56 cursor-pointer"
                    @click="playVideo(item.link)">
                    <!-- Video Thumbnail -->
                    <img :src="`https://fargona24.uz/storage/${item.image}`" :alt="item.name"
                        class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />

                    <!-- Play Button Overlay -->
                    <div
                        class="absolute inset-0   flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="bg-red-600 rounded-full p-3 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Gradient Overlay and Text -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div class="absolute bottom-0 left-0 w-full p-3">
                            <p class="text-white text-sm font-semibold line-clamp-2">
                                {{ item.name }}
                            </p>
                            <p class="text-white/80 text-xs mt-1">
                                {{ formatDate(item.date) }}
                            </p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>

            <!-- Video Modal -->
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
                @click="closeModal">
                <div class="relative bg-white rounded-lg w-full max-w-4xl aspect-video" @click.stop>
                    <button @click="closeModal" class="absolute -top-10 right-0 text-white hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <iframe v-if="activeVideoId" class="w-full h-full rounded-lg"
                        :src="`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.swiper {
    width: 100%;
    padding-bottom: 40px;
}

.swiper-pagination {
    bottom: 0 !important;
}

/* Ensure the modal is above everything else */
.fixed {
    z-index: 9999;
}
</style>