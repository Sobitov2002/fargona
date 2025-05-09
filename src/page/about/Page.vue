<script setup lang="ts">
import {  ref ,onMounted } from 'vue'
import api from '@/services/apiServices' 

const aboutData = ref<TeamMember[]>([]);


const aboutHandler = async () =>{
        try {
            const response = await api.get('/team?lang=ru')
            aboutData.value = response.data
            console.log("About",aboutData.value);
        } catch (error) {
            console.log(error);
            
        }
}

onMounted (async () =>{
    await aboutHandler()
})
interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

</script>
<template>
    <div class=" flex-col space-y-5 max-w-[1250px] mx-auto p-5">
        <!-- About Section - Simplified -->
        <div class="container mx-auto px-4 py-12 rounded-xl bg-white">
            <div class="flex flex-col md:flex-row items-start gap-8">
                <div class="md:w-1/2 items-center flex-col">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">Farg'ona24 haqida</h2>
                    <p class="text-gray-600 mb-4">
                        FARGONA24.UZ. Web-Site OAV sifatida 2022 yil 26 iyul kuni O‘zbekiston Respublikasi Prezidenti
                        Administratsiyasi huzuridagi Axborot va ommaviy kommunikatsiyalar agentligidan 1684 raqam bilan
                        ro‘yxatga olingan. Muassis: “SAMANDAR FARGʻONA24” MChJ. Tahririyat manzili: 150606, Fargʻona
                        viloyati Farg‘ona shahri Elektron manzil: info@Fargona24.uz
                    </p>
                    <p class="text-gray-600 mb-4 border-t pt-2">
                        Farg‘ona24 bugungi kunda Fargʻona haqidagi eng so‘nggi xabarlarni yetkazuvchi koʻp yillik
                        tajribaga ega ijtimoiy-siyosiy, axborot -tahliliy Ommaviy axborot vositasi.
                    </p>
                    <button class="mt-2 bg-gray-800 hover:bg-gray-700 text-lg text-white py-2 px-4 rounded-xl">
                        Bog'lanish +012 345 6789
                    </button>
                </div>

                <div class="md:w-1/2">
                    <img src="https://ik.imagekit.io/vtroph5l9/Product/logotip.jpg?updatedAt=1746790238401"
                        alt="Farg'ona24 Office" class="w-full rounded-xl " />
                </div>
            </div>
        </div>

        <!-- Stats Section - Simplified -->
        <div class="rounded-xl bg-white py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-gray-800 mb-6 text-center">Bizning auditoriya</h2>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-gray-100 p-4 text-center border rounded-xl border-gray-100">
                        <div class="text-gray-800 font-bold text-2xl mb-1">400,000+</div>
                        <div class="text-gray-500">Telegram</div>
                    </div>

                    <div class="bg-gray-100 p-4 text-center border rounded-xl border-gray-100">
                        <div class="text-gray-800 font-bold text-2xl mb-1">38,000+</div>
                        <div class="text-gray-500">Instagram</div>
                    </div>

                    <div class="bg-gray-100 p-4 text-center border rounded-xl border-gray-100">
                        <div class="text-gray-800 font-bold text-2xl mb-1">5,000+</div>
                        <div class="text-gray-500">Facebook</div>
                    </div>

                    <div class="bg-gray-100 p-4 text-center border rounded-xl border-gray-100">
                        <div class="text-gray-800 font-bold text-2xl mb-1">50,000+</div>
                        <div class="text-gray-500">Youtube</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Team Section - Simplified -->
        <div class="container mx-auto px-4 py-12 rounded-xl bg-white">
            <h2 class="text-4xl font-bold text-gray-800 mb-6 text-center">Bizning jamoa</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="member in aboutData" :key="member.id" class="border rounded-xl border-gray-200">
                    <img :src="`https://fargona24.uz/storage/${member.image}`" :alt="member.name"
                        class="w-full md:h-80 h-72 object-cover object-center rounded-t-xl" />
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800">{{ member.name }}</h3>
                        <p class="text-gray-600 text-sm">{{ member.role }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

