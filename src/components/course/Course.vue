<script setup lant="ts">
import { ref, onMounted, computed } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
const currencies = ref([])
const loading = ref(false)
const error = ref(null)
import { useLangStore } from '@/stores/lang'

const store = useLangStore()
const fetchCurrencies = async () => {
    loading.value = true
    error.value = null

    try {
        const res = await fetch('https://cbu.uz/oz/arkhiv-kursov-valyut/json/')
        const data = await res.json()
        currencies.value = data.filter(item => ['USD', 'RUB', 'EUR'].includes(item.Ccy))
    } catch (err) {
        error.value = 'Valyuta kurslarini olishda xatolik'
        console.error('Valyuta kurslarini olishda xatolik:', err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchCurrencies)
const mainText = computed(() => {
    if (store.lang === 'uz') return 'Valyuta kurslari';
    if (store.lang === 'ru') return 'Курсы валют';
    if (store.lang === 'kr') return 'Валюта курс';
    return 'Asosiy';
});
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-xl mt-6 p-4 md:flex  space-y-2 items-center justify-between">
        <div class="flex justify-between items-center ">
            <h2 class="text-xl text-gray-800 dark:text-slate-200 font-bold">{{ mainText }}</h2>
        </div>
        <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
        <div v-if="loading && !currencies.length" class="text-gray-500">
            <div class="grid md:grid-cols-2  grid-cols-1">
                <Skeleton class="w-[200px] bg-gray-300 dark:bg-gray-700 h-5 rounded-full" />
                <Skeleton class="w-[400px] bg-gray-300 dark:bg-gray-700 h-5 rounded-full" />
            </div>
        </div>

        <ul v-else class="flex flex-col md:flex-row md:gap-6 gap-2">
            <li v-for="currency in currencies" :key="currency.Ccy"
                class="text-gray-800 dark:text-slate-200 text-sm md:text-base">
                <span class="font-semibold"> ({{ currency.Ccy }}):</span>
                {{ currency.Rate }} UZS
            </li>
        </ul>

    </div>
</template>
