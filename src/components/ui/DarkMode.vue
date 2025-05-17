<script setup lang="ts">
import { useDarkModeStore } from "@/stores/darkMode";

const darkModeStore = useDarkModeStore();
</script>

<template>
    <button @click="darkModeStore.toggleDarkMode"
        class="relative flex items-center justify-center w-7 h-7 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary overflow-hidden"
        :class="{
            'bg-[#173044]': darkModeStore.darkMode,
            'bg-blue-100': !darkModeStore.darkMode,
        }" aria-label="Toggle dark mode">
        <div class="relative w-6 h-6">
            <!-- Sun icon -->
            <div class="absolute inset-0 transition-transform duration-500 ease-in-out" :class="{
                'translate-y-full': darkModeStore.darkMode,
                'translate-y-0': !darkModeStore.darkMode
            }">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" fill="#F59E0B" />
                    <path
                        d="M12 2V4M12 20V22M4 12H2M6.31 6.31L4.9 4.9M17.69 6.31L19.1 4.9M6.31 17.69L4.9 19.1M17.69 17.69L19.1 19.1M22 12H20"
                        stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>

            <!-- Moon icon -->
            <div class="absolute inset-0 transition-transform duration-500 ease-in-out" :class="{
                'translate-y-0': darkModeStore.darkMode,
                '-translate-y-full': !darkModeStore.darkMode
            }">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#A3A3A3" stroke="#A3A3A3"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </button>
</template>

<style scoped>
button:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
