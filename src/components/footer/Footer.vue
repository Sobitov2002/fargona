<script setup lang="ts">
import { ref, computed } from 'vue'
import Logo from '../ui/Logo.vue'
import { useLangStore } from '@/stores/lang'
import router from '@/router'

const store = useLangStore()

interface FooterLink {
    text: string
    url: string
}

interface SocialLink {
    name: string
    url: string
    icon: string
}



// Lucide yoki Iconify belgilar ishlatilgan
const socialLinks = ref<SocialLink[]>([
    { name: 'Telegram', url: 'https://t.me/Fargona24', icon: 'fa-telegram' },
    { name: 'Instagram', url: 'https://instagram.com/fargona24.uz', icon: 'fa-instagram' },
    { name: 'YouTube', url: 'https://youtube.com/@fargona24_uz', icon: 'fa-youtube' },
    { name: 'Facebook', url: 'https://www.facebook.com/FARGONALIKLAR24', icon: 'fa-facebook' }
])
const mainText = computed(() => {
    if (store.lang === 'uz') {
        return {
            text_1: 'Biz haqimizda',
            text_2: "Bog`lanish",
            text_3: "Tahririyat manzili: 150606, Farg`ona viloyati Farg`ona shahri",
            text_4: "Farg'ona24 2019-yil 15-iyunda ishga tushgan o'zbek tilidagi eng faol internet-nashrlardan biri. Muassis: 'SAMANDAR FARG'ONA24' MCHJ. 'FARGONA24.UZ' saytida e'lon qilingan materiallardan nusxa ko'chirish, tarqatish va boshqa shakllarda foydalanish faqat tahririyat yozma roziligi bilan  amalga oshirilishi mumkin. Tahririyat manzili: 150606, Farg'ona viloyati Farg'ona shahri Elektron manzil: info@fargona24.uz',",  
            text_5: 'Bizni ijtimoiy tarmoqlarda kuzatib boring',
            text_6: "Farg'ona viloyati yangiliklari va ma'lumotlari"
        };
    }
    if (store.lang === 'ru') {
        return {
            text_1: 'О нас',
            text_2: 'Связаться с нами',
            text_3: 'Адрес редакции: 150606, Ферганская область, город Фергана',
            text_4: 'Farg‘ona24 — один из самых активных интернет-изданий на узбекском языке, начавший работу 15 июня 2019 года. Учредитель: ООО "SAMANDAR FARG‘ONA24". Копирование, распространение и иное использование материалов, опубликованных на сайте "FARGONA24.UZ", возможно только с письменного разрешения редакции. Адрес редакции: 150606, Ферганская область, город Фергана. Электронная почта: info@fargona24.uz',
            text_5: 'Следите за нами в социальных сетях',
            text_6:"Новости и информация Ферганской области"
        };
    }
    if (store.lang === 'kr') {
        return {
            text_1: 'Биз ҳақимизда',
            text_2: 'Боғланиш',
            text_3: "Таҳририят манзили: 150606, Фарғона вилояти, Фарғона шаҳри",
            text_4: "Фарғона24 2019-йил 15-июнда ишга тушган ўзбек тилидаги энг фаол интернет-нашрлардан бири. Муассис: 'SAMANDAR FARG‘ONA24' МЧЖ. 'FARGONA24.UZ' сайтида эълон қилинган материаллардан нусха кўчириш, тарқатиш ва бошқа шаклларда фойдаланиш фақат таҳририят ёзма розилиги билан амалга оширилиши мумкин. Таҳририят манзили: 150606, Фарғона вилояти, Фарғона шаҳри. Электрон манзил: info@fargona24.uz",
            text_5: 'Бизни ижтимоий тармоқларда кузатиб боринг',
            text_6: "Фарғона вилояти янгиликлари ва маълумотлари"
        };
    }
});
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
                        {{ mainText?.text_6 }}
                    </p>
                </div>

                <div>
                    <ul class="space-y-2">
                        <router-link :to="'/about'" :key="`about`">
                            <h1 class="text-xl cursor-pointer font-medium mb-4 hover:text-white transition-colors">
                                {{ mainText?.text_1 }}
                            </h1>
                        </router-link>
                    </ul>
                </div>

                <div>
                    <ul class="space-y-2">
                        <router-link :to="'/contact'" :key="`about`">
                            <h1 class="text-xl cursor-pointer font-medium mb-4 hover:text-white transition-colors">
                                {{ mainText?.text_2 }}
                            </h1>
                        </router-link>
                    </ul>
                    <div class="mt-4">
                        <p class="text-sm text-gray-300">
                            {{mainText?.text_3}}
                        </p>
                        <p class="text-sm text-gray-300 mt-1">
                            info@fargona24.uz
                        </p>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-700 my-6"></div>

            <div class="text-xs text-gray-400 mb-6">
                <p>

                    {{ mainText?.text_4 }}
                </p>

            </div>

            <!-- Social links -->
            <div>
                <h4 class="text-sm font-medium mb-3">{{ mainText?.text_5 }}</h4>
                <div class="flex space-x-4">
                    <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="social.name"
                        class="w-10 h-10 flex items-center justify-center  rounded-full transition-colors"
                        target="_blank" rel="noopener noreferrer">
                        <i :class="social.icon" class="fa-brands text-[35px] "></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>



<style scoped></style>
