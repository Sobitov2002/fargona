<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarStore'
import Logo from '@/components/ui/Logo.vue'
import { ref, onMounted, watch ,computed } from "vue";
import { getCategory } from './services'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useLangStore } from '@/stores/lang';


const selectedLang = ref(localStorage.getItem('lang') || 'uz');
const store = useLangStore()

watch(selectedLang, async (newLang) => {
    localStorage.setItem('lang', newLang)
    categories.value = await getCategory(newLang)
})


watch(selectedLang, () => {
  store.lang = selectedLang.value;

  
});
const mainText = computed(() => {
  if (selectedLang.value === 'uz') return 'Asosiy';
  if (selectedLang.value === 'ru') return 'Главный';
  if (selectedLang.value === 'kr') return 'Асосий'; 
  return 'Asosiy';
});


const sidebarStore = useSidebarStore()

interface Category {
    id: number
    name: string
}

const categories = ref<Category[]>([])

onMounted(async () => {
    categories.value = await getCategory(selectedLang.value);
    console.log(categories.value);

})
</script>

<template>
    <div class="w-full z-10 px-3 py-4 bg-[#173044] fixed">
        <div class="max-w-[1250px] px-4 w-full mx-auto flex justify-between items-center">
            <Logo />
            <div class="hidden md:block">
                <div class="flex justify-between gap-6">
                        <p class="text-white text-[15px]  font-sans font-bold cursor-pointer">{{mainText}}</p>
                    <ul v-for="(item, index) in categories" :key="index"
                        class="flex justify-between gap-6 text-white text-[15px]  font-sans font-bold cursor-pointer">
                        <router-link :to="`/category/${item.id}`">
                            {{ item.name }}
                        </router-link>
                    </ul>
                </div>
            </div>

            <div class="md:block flex justify-between items-center ">
                <div class=" md:block">
                    <Select v-model="selectedLang">
                        <SelectTrigger class="text-white border-none">
                            <SelectValue class="font-bold" placeholder="Tilni tanlang" />
                        </SelectTrigger>
                        <SelectContent class="bg-[#173044] border-none m-0 p-0 ">
                            <SelectGroup>
                                <SelectItem class="text-white m-0 hover:bg-[#4c5d6b] text-[15px] border-none"
                                    value="uz">
                                    O'zbek
                                </SelectItem>
                                <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px] border-none px-2 py-2"
                                    value="ru">
                                    Русский
                                </SelectItem>
                                <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px] border-none px-2 py-2"
                                    value="kr">
                                    Ўzbek
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div class="lg:hidden cursor-pointer" @click="sidebarStore.isOpen = !sidebarStore.isOpen">
                        <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
