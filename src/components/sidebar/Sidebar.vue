<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { useSidebarStore } from '@/stores/sidebarStore';
import Logo from '@/components/ui/Logo.vue';
import { getSidebar } from './services';
import { useLangStore } from '@/stores/lang';
import { useRouter } from 'vue-router'
import { Menu } from 'lucide-vue-next'

const router = useRouter()
const sidebarRef = ref<HTMLElement | null>(null);
const activeItem = ref<number | null>(null);
const store = useLangStore()


const sidebarStore = useSidebarStore();

interface Category {
    id: number;
    name: string;
}

const categories = ref<Category[]>([]);

const getSidebarItem = async () =>{
    try {
        categories.value = await getSidebar();
    
        if (categories.value.length > 0) {
            activeItem.value = categories.value[0].id;
        }
    } catch (error) {
        console.log(error);
        
    }
}

const mainText = ref('Asosiy');

// Tilga qarab matnni o‘zgartirish
const updateMainText = () => {
    if (store.lang === 'uz') {
        mainText.value = 'Asosiy';
    } else if (store.lang === 'ru') {
        mainText.value = 'Главный';
    } else if (store.lang === 'kr') {
        mainText.value = 'Асосий';
    }
};
onMounted(async () => {
    await getSidebarItem()
    updateMainText();
});



const toggleSidebar = () => {
    sidebarStore.isOpen = !sidebarStore.isOpen;
};
watch(() => store.lang, async () => {
    updateMainText();
    await getSidebarItem()
})

const setActive = (id: number | null) => {
    activeItem.value = id;
}

interface SocialLink {
    name: string
    url: string
    icon: string
}
const socialLinks = ref<SocialLink[]>([
    { name: 'Telegram', url: 'https://t.me/Fargona24', icon: 'fa-telegram' },
    { name: 'Instagram', url: 'https://instagram.com/fargona24.uz', icon: 'fa-instagram' },
    { name: 'YouTube', url: 'https://youtube.com/@fargona24_uz', icon: 'fa-youtube' },
    { name: 'Facebook', url: 'https://www.facebook.com/FARGONALIKLAR24', icon: 'fa-facebook' }
])
const saveCategoryId = (id: number) => {
    localStorage.setItem('selectedCategoryId', id.toString());
}
</script>

<template>
    <Transition name="fade">
        <div v-if="sidebarStore.isOpen" @click="toggleSidebar" class="fixed inset-0 backdrop-blur-sm z-30 lg:hidden">
        </div>
    </Transition>

    <aside ref="sidebarRef"
        class="fixed top-0 left-0 z-40 w-[260px] h-screen transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="{
            '-translate-x-full': !sidebarStore.isOpen,
            'translate-x-0 shadow-2xl': sidebarStore.isOpen
        }">
        <div class="h-full bg-[#173040] py-6 px-4 overflow-hidden flex flex-col relative backdrop-blur-md">
            <!-- Header with Logo -->
            <div class="flex items-center justify-between mb-8">
                <Logo />
                <button @click="toggleSidebar" class="text-white/70 hover:text-white lg:hidden">
                    <Menu class="w-5 h-5" />
                </button>
            </div>
            <div class="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
            <div class="flex-1 overflow-y-auto sidebar-scrollbar px-1">
                <ul class="space-y-1 pb-6">
                    <h1 name="list">
                        <!-- mainText element as li -->
                        <li class="relative">
                            <button @click="setActive(null)"
                                class="group flex items-left gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                                :class="{
                                    'bg-[#1E3D4E] text-white': activeItem === null,
                                    'text-gray-300 hover:bg-[#1E3D4E]/50 hover:text-white': activeItem !== null
                                }">
                                <router-link to="/" class="flex-1 font-bold text-md ">
                                    {{ mainText }}
                                </router-link>
                            </button>
                            <!-- Active indicator -->
                            <div v-if="activeItem === null"
                                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full">
                            </div>
                        </li>

                        <!-- Dynamic category items -->
                        <li v-for="(item, index) in categories" :key="item.id" class="relative">
                            <router-link :to="`/category/${item.id}`" class="flex flex-col items-start">
                                <button @click="setActive(item.id),  saveCategoryId(item.id)"
                                    class="group flex items-left gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                                    :class="{
                                        'bg-[#1E3D4E] text-white': activeItem === item.id,
                                        'text-gray-300 hover:bg-[#1E3D4E]/50 hover:text-white': activeItem !== item.id
                                    }">
                                    <span class="flex-1 text-md font-bold">{{ item.name }}</span>
                                </button>
                            </router-link>

                            <!-- Active indicator -->
                            <div v-if="activeItem === item.id"
                                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full">
                            </div>
                        </li>
                    </h1>
                </ul>
            </div>

            <!-- Footer -->
            <div class="mt-auto pt-4 border-t border-white/10">
                <h4 class="text-sm font-medium mb-3 text-white">Bizni ijtimoiy tarmoqlarda kuzatib boring</h4>
                <div class="flex space-x-4">
                    <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="social.name"
                        class="w-10 h-10 flex items-center justify-center  rounded-full transition-colors"
                        target="_blank" rel="noopener noreferrer">
                        <i :class="social.icon" class="fa-brands text-white text-[33px] "></i>
                    </a>
                </div>
            </div>
        </div>
    </aside>
</template>
