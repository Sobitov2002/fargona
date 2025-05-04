<script setup lang="ts">
import {  watch, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSidebarStore } from '@/stores/sidebarStore';
import Logo from '@/components/ui/Logo.vue'
import { getCategory } from '@/components/header/services'

const router = useRouter();
const route = useRoute();
const sidebarRef = ref<HTMLElement | null>(null);
const selectedLang = ref(localStorage.getItem('lang') || 'uz')
const sidebarStore = useSidebarStore();



watch(selectedLang, async (newLang) => {
    localStorage.setItem('lang', newLang)
    categories.value = await getCategory(newLang)
})

interface Category {
    id: number
    name: string
}

const categories = ref<Category[]>([])

onMounted(async () => {
    categories.value = await getCategory(selectedLang.value)
})





const getSvgIcon = (icon: string, isActive: boolean) => {
    const activeClass = isActive ? 'text-white' : 'text-gray-400 group-hover:text-white';
    return icon.replace(/class="[^"]+"/, `class="w-5 h-5 transition-all duration-300 ${activeClass}"`);
};

const toggleSidebar = () => {
    sidebarStore.isOpen = !sidebarStore.isOpen;
};





</script>

<template>

    <Transition name="fade">
        <div v-if="sidebarStore.isOpen" @click="toggleSidebar" class="fixed inset-0 backdrop-blur-sm z-30 lg:hidden">
        </div>
    </Transition>

    <aside ref="sidebarRef"
        class="fixed top-0 left-0 z-40 w-[230px] h-screen transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="{
            '-translate-x-full': !sidebarStore.isOpen,
            'translate-x-0 shadow-2xl': sidebarStore.isOpen
        }">
        <div class="h-full bg-[#173040] py-6 px-4 overflow-hidden flex flex-col relative backdrop-blur-md">

            <div class="flex flex-col items-center mb-8">
                <Logo />
                <div class="mt-5 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <!-- Sidebar Menu -->
            <div class="flex-1 overflow-y-auto sidebar-scrollbar px-1">
                <ul class="space-y-2 pb-6">
                    <TransitionGroup name="list">
                        <li v-for="(item, index) in categories" :key="index">
                            {{ item.name }}
                        </li>

                    </TransitionGroup>
                </ul>
            </div>
        </div>
    </aside>
</template>

<style scoped>

.sidebar-scrollbar::-webkit-scrollbar {
    width: 3px;
}

.sidebar-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Active menu item animation */
.active-menu-item {
    position: relative;
    animation: pulseGlow 2s infinite alternate;
}

@keyframes pulseGlow {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 117, 255, 0);
    }

    100% {
        box-shadow: 0 0 8px 1px rgba(0, 117, 255, 0.2);
    }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(-20px);
}

.list-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

/* Hover effects */
.group:hover .group-hover\:bg-\[\#252b4a\] {
    background-color: #252b4a;
}

.group:hover .group-hover\:text-white {
    color: white;
}
</style>
