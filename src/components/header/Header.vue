<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarStore'
import Logo from '@/components/ui/Logo.vue'
import { ref, onMounted, watch, computed } from "vue";
import { getCategory } from './services'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'vue-router'
import { Search, X } from 'lucide-vue-next'
import DarkMode from '@/components/ui/DarkMode.vue'
import { useLangStore } from '@/stores/lang';

const router = useRouter()
const selectedLang = ref(localStorage.getItem('lang') || 'uz');
const store = useLangStore()
const searchQuery = ref('');
const isSearchOpen = ref(false);
const sidebarStore = useSidebarStore()

interface Category {
    id: number
    name: string
}

const categories = ref<Category[]>([])

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
        searchQuery.value = '';
        isSearchOpen.value = false;
    }
}

const mainText = computed(() => {
    if (selectedLang.value === 'uz') return 'Asosiy';
    if (selectedLang.value === 'ru') return 'Главный';
    if (selectedLang.value === 'kr') return 'Асосий';
    return 'Asosiy';
});
const mainText2 = computed(() => {
    if (selectedLang.value === 'uz') return 'Reklama';
    if (selectedLang.value === 'ru') return 'Реклама';
    if (selectedLang.value === 'kr') return 'Реклама';
    return 'Asosiy';
});

const searchPlaceholder = computed(() => {
    if (selectedLang.value === 'uz') return 'Qidirish...';
    if (selectedLang.value === 'ru') return 'Поиск...';
    if (selectedLang.value === 'kr') return 'Қидириш...';
    return 'Qidirish...';
});

onMounted(async () => {
    categories.value = await getCategory(selectedLang.value);
})

watch(selectedLang, async (newLang) => {
    localStorage.setItem('lang', newLang)
    categories.value = await getCategory(newLang)
})

watch(selectedLang, () => {
    store.lang = selectedLang.value;
})

// 🔥 Tanlangan category.id ni localStoragega saqlovchi funksiya
const saveCategoryId = (id: number) => {
    localStorage.setItem('selectedCategoryId', id.toString());
}
</script>

<template>
    <div class="w-full z-10 px-3 py-4 bg-[#173044] fixed">
        <div class="max-w-[1250px] px-4 w-full mx-auto flex justify-between items-center">
            <Logo />

            <div class="hidden md:block ml-4">
                <div class="flex justify-between gap-5">
                    <p @click="router.push('/')"
                        class="text-white hover:text-[#6489ce] whitespace-nowrap text-[15px] font-sans font-bold cursor-pointer">
                        {{ mainText }}
                    </p>

                    <ul class="flex justify-between  gap-5 text-white text-[15px] font-sans font-bold cursor-pointer">
                        <li v-for="(item, index) in categories" :key="index">
                            <router-link class="hover:text-[#6489ce] whitespace-nowrap" :to="`/category/${item.id}`"
                                @click="saveCategoryId(item.id)">
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                    <a href="https://t.me/FarAdmin24" target="_blank" rel="noopener noreferrer"
                        class="text-white hover:text-[#6489ce] whitespace-nowrap text-[15px] font-sans font-bold cursor-pointer">
                        {{ mainText2 }}
                    </a>
                </div>
            </div>

            <!-- Desktop Search Input -->
            <div class="hidden md:block relative flex-1 max-w-xs mx-4">
                <form @submit.prevent="handleSearch">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" :placeholder="searchPlaceholder"
                            class="w-full bg-[#2a4559] text-white placeholder-gray-300 rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4c5d6b]" />
                        <Search class="absolute left-2.5 top-1.5 h-4 w-4 text-gray-300" />
                    </div>
                </form>
            </div>



            <div class="flex items-center gap-2">
                <!-- Mobile Search Toggle Button -->
                <button @click="toggleSearch"
                    class="md:hidden text-white p-1.5 rounded-md hover:bg-[#2a4559] focus:outline-none"
                    aria-label="Toggle search">
                    <Search v-if="!isSearchOpen" class="h-5 w-5" />
                    <X v-else class="h-5 w-5" />
                </button>

                <div class="md:block">
                    <Select v-model="selectedLang">
                        <SelectTrigger class="text-white border-none">
                            <SelectValue class="font-bold" placeholder="Tilni tanlang" />
                        </SelectTrigger>
                        <SelectContent class="bg-[#173044] border-none m-0 p-0">
                            <SelectGroup>
                                <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px]" value="uz">
                                    O'zbek
                                </SelectItem>
                                <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px]" value="ru">
                                    Русский
                                </SelectItem>
                                <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px]" value="kr">
                                    Ўзбек
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <div class="lg:hidden cursor-pointer" @click="sidebarStore.isOpen = !sidebarStore.isOpen">
                        <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                </div>
                <div class="">
                    <DarkMode />
                </div>
            </div>
        </div>

        <!-- Mobile Search Input (Expandable) -->
        <div v-if="isSearchOpen" class="md:hidden mt-3 px-4 pb-2 max-w-[1250px] mx-auto">
            <form @submit.prevent="handleSearch">
                <div class="relative">
                    <input v-model="searchQuery" type="text" :placeholder="searchPlaceholder"
                        class="w-full bg-[#2a4559] text-white placeholder-gray-300 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4c5d6b]"
                        autofocus />
                    <Search class="absolute left-2.5 top-2 h-4 w-4 text-gray-300" />
                </div>
            </form>
        </div>
    </div>
</template>
