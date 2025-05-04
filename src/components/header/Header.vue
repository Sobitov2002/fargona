<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarStore'
import Logo from '@/components/ui/Logo.vue'
import { ref, onMounted, watch } from "vue";
import { getCategory } from './services'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DarkMode from '../ui/DarkMode.vue';


const selectedLang = ref(localStorage.getItem('lang') || 'uz')

watch(selectedLang, async (newLang) => {
    localStorage.setItem('lang', newLang)
    categories.value = await getCategory(newLang)  
})


const sidebarStore = useSidebarStore()

interface Category {
    id: number
    name: string
}

const categories = ref<Category[]>([])

onMounted(async () => {
    categories.value = await getCategory(selectedLang.value) 
})
</script>

<template>
    <div class="w-full px-3 py-4 bg-[#173044] fixed">
        <div class="max-w-[1114px] w-full mx-auto flex justify-between items-center">
            <Logo />

            
            <div class="hidden md:block">
                <div class="flex justify-between gap-6">
                    <ul class="flex justify-between gap-6 text-white text-[15px]  font-sans font-bold cursor-pointer">
                        <li v-for="(item, index) in categories" :key="index">
                            {{ item.name }}
                        </li>
                    </ul>
                </div>
            </div>

           
            <div class=" md:block">
                <Select v-model="selectedLang">
                    <SelectTrigger class="text-white border-none">
                        <SelectValue class="font-bold" placeholder="Tilni tanlang" />
                    </SelectTrigger>
                    <SelectContent class="bg-[#173044] border-none m-0 p-0 ">
                        <SelectGroup>
                            <SelectItem class="text-white m-0 hover:bg-[#4c5d6b] text-[15px] border-none" value="uz">
                                O'zbek
                            </SelectItem>
                            <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px] border-none px-2 py-2"
                                value="ru">
                                Русский
                            </SelectItem>
                            <SelectItem class="text-white hover:bg-[#4c5d6b] text-[15px] border-none px-2 py-2"
                                value="kr">
                                Ўzbek (Кирилл)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

         
            <div>
                <div class="lg:hidden cursor-pointer" @click="sidebarStore.isOpen = !sidebarStore.isOpen">
                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
