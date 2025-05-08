<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useLangStore } from '@/stores/lang'
const store = useLangStore()

interface Currency {
    Ccy: string
    CcyNm_UZ: string
    Rate: string
    Date: string
    id: number
}
const currencies = ref<Currency[]>([])

const getValuta = async () =>{
    try {
        const res = await fetch(`https://cbu.uz/${store.lang}/arkhiv-kursov-valyut/json/`)
        const data = await res.json()
        currencies.value = data.filter(item => ['USD', 'RUB', 'EUR'].includes(item.Ccy))
    } catch (error) {
        console.error('Valyuta kurslarini olishda xatolik:', error)
    }
}
watch(() => store.lang, async () => {
    await getValuta()
})
onMounted(async () => {
    await getValuta()
})
</script>

<template>
    <div class="block  bg-white rounded-xl mt-6">
        <div class="p-4 md:flex justify-between">
            <h2 class="text-xl font-bold ">Valyuta kurslari</h2>
            <ul v-if="currencies.length" class="space-y-2 md:flex gap-4">
                <li v-for="currency in currencies" :key="currency.Ccy" class="text-slate-800">
                    <span class="font-semibold">{{ currency.CcyNm_UZ }} ({{ currency.Ccy }}):</span>
                    {{ currency.Rate }} 
                </li>
            </ul>
            <p v-else class="text-gray-500">Yuklanmoqda...</p>
        </div>
    </div>
</template>