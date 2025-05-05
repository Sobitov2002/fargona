<script setup lang="ts">
import { ref } from 'vue'
import Logo from '../ui/Logo.vue'

// Define types for footer links
interface FooterLink {
    text: string
    url: string
}

interface SocialLink {
    name: string
    url: string
    icon: string
}


const aboutLinks = ref<FooterLink[]>([
    { text: 'Biz haqimizda', url: '/about' },
])

const contactLinks = ref<FooterLink[]>([
    { text: 'Bog\'lanish', url: '/contact' },
])

const socialLinks = ref<SocialLink[]>([
    { name: 'Telegram', url: 'https://t.me/fargona24', icon: 'i-lucide-send' },
    { name: 'Instagram', url: 'https://instagram.com/fargona24', icon: 'i-lucide-instagram' },
    { name: 'YouTube', url: 'https://youtube.com/fargona24', icon: 'i-lucide-youtube' },
    { name: 'Facebook', url: 'https://facebook.com/fargona24', icon: 'i-lucide-facebook' }
])

</script>

<template>
    <footer class="bg-[#1a2e42] text-white py-12">
        <div class="max-w-[1260px] w-full mx-auto px-4">

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

                <div>
                    <div class="flex items-center mb-4">
                        <Logo />
                    </div>
                    <p class="text-sm text-gray-300 mt-4">
                        Farg'ona viloyati yangiliklari va ma'lumotlari
                    </p>
                </div>
                <div>

                    <ul class="space-y-2">
                        <li v-for="(link, index) in aboutLinks" :key="`about-${index}`">
                            <a :href="link.url" class="text-lg font-medium mb-4 hover:text-white transition-colors">
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>

                    <ul class="space-y-2">
                        <li v-for="(link, index) in contactLinks" :key="`contact-${index}`">
                            <a :href="link.url" class="text-lg font-medium mb-4 hover:text-white transition-colors">
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                    <div class="mt-4">
                        <p class="text-sm text-gray-300">
                            Tahririyat manzili: 150606, Farg'ona viloyati Farg'ona shahri
                        </p>
                        <p class="text-sm text-gray-300 mt-1">
                            Email: info@fargona24.uz
                        </p>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-700 my-6"></div>
            <div class="text-xs text-gray-400 mb-6">
                <p>
                    Farg'ona24 2019-yil 15-iyunda ishga tushgan o'zbek tilidagi eng faol internet-nashrlardan biri.
                    Muassis: "SAMANDAR FARG'ONA24" MCHJ. "FARGONA24.UZ" saytida e'lon qilingan materiallardan
                    nusxa ko'chirish, tarqatish va boshqa shakllarda foydalanish faqat tahririyat yozma roziligi bilan
                    amalga oshirilishi mumkin.
                </p>
                <p class="mt-2">
                    Tahririyat manzili: 150606, Farg'ona viloyati Farg'ona shahri Elektron manzil: info@fargona24.uz
                </p>
            </div>

            <!-- Social links -->
            <div>
                <h4 class="text-sm font-medium mb-3">Bizni ijtimoiy tarmoqlarda kuzatib boring</h4>
                <div class="flex space-x-4">
                    <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="social.name"
                        class="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                        target="_blank" rel="noopener noreferrer">
                        <span :class="social.icon" class="w-5 h-5"></span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
/* You can add custom styles here if needed */
</style>