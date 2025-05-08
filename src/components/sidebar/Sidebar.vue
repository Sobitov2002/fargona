<script setup lang="ts">
import { watch, ref, onMounted, computed } from 'vue';
import { useSidebarStore } from '@/stores/sidebarStore';
import Logo from '@/components/ui/Logo.vue';
import { getSidebar } from './services';
import { useLangStore } from '@/stores/lang';
const sidebarRef = ref<HTMLElement | null>(null);
const activeItem = ref<number | null>(null);
const store = useLangStore()


const sidebarStore = useSidebarStore();

interface Category {
    id: number;
    name: string;
    icon?: string;
}

const categories = ref<Category[]>([]);

const getSidebarItem = async () =>{
    try {
       const responce = await getSidebar();
       categories.value = responce
        if (categories.value.length > 0) {
            activeItem.value = categories.value[0].id;
        }
    } catch (error) {
        console.log(error);
        
    }
}
onMounted(async () => {
    await getSidebarItem()
});



const toggleSidebar = () => {
    sidebarStore.isOpen = !sidebarStore.isOpen;
};
watch(() => store.lang, async () => {
    await getSidebarItem()
})

const setActive = (id: number) => {
    activeItem.value = id;
};




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
                    <TransitionGroup name="list">
                        <li v-for="(item, index) in categories" :key="item.id" class="relative">
                            <!-- Main menu item -->
                            <router-link :to="`/category/${item.id}`" class="flex flex-col items-start">
                                <button @click="setActive(item.id)"
                                    class="group flex items-left gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                                    :class="{
                                        'bg-[#1E3D4E] text-white': activeItem === item.id,
                                        'text-gray-300 hover:bg-[#1E3D4E]/50 hover:text-white': activeItem !== item.id
                                    }">
                                    <span class="flex-1 text-sm  font-medium">{{ item.name }}</span>
                                </button>
                            </router-link>

                            <!-- Active indicator -->
                            <div v-if="activeItem === item.id"
                                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full">
                            </div>
                        </li>
                    </TransitionGroup>
                </ul>
            </div>

            <!-- Footer -->
            <div class="mt-auto pt-4 border-t border-white/10">
                <div
                    class="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg hover:bg-[#1E3D4E]/50 hover:text-white cursor-pointer">
                    <Settings class="w-5 h-5" />
                    <span class="text-sm font-medium">Settings</span>
                </div>

                <!-- Language selector -->
                <div class="mt-4 flex gap-2">
                   
                </div>
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

/* Submenu animation */
.submenu-enter-active,
.submenu-leave-active {
    transition: all 0.3s ease;
    max-height: 300px;
}

.submenu-enter-from,
.submenu-leave-to {
    opacity: 0;
    max-height: 0;
}
</style>