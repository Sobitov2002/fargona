<script setup>
import { ref, onMounted } from 'vue'
import { RefreshCw } from 'lucide-vue-next'

const currencies = ref([])
const loading = ref(false)
const error = ref(null)

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
</script>

<template>
    <div class="bg-white rounded-xl mt-6 p-4 flex items-center justify-between">
        <div class="flex justify-between items-center ">
            <h2 class="text-xl text-gray-800 font-bold">Valyuta kurslari</h2>

        </div>

        <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>

        <div v-if="loading && !currencies.length" class="text-gray-500">
            Yuklanmoqda...
        </div>

        <ul v-else class="md:flex gap-4 space-y-2 md:space-y-0">
            <li v-for="currency in currencies" :key="currency.Ccy" class="text-gray-800">
                <span class="font-semibold">{{ currency.CcyNm_UZ }} ({{ currency.Ccy }}):</span>
                {{ currency.Rate }} UZS
            </li>
        </ul>
    </div>
</template>
