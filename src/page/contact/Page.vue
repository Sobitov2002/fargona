<template>
    <div class="p-5  max-w-[1250px] mx-auto">
        <div class="bg-white rounded-2xl p-5">
            <!-- Contact Info Cards -->
            <div class=" rounded-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Address Card -->
                <div class="bg-gray-100 p-6 rounded-2xl shadow-sm">
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <div class="w-1 h-5 bg-blue-500 mr-2"></div>
                        Manzil
                    </h2>
                    <div class="flex items-start">
                        <span class="text-gray-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </span>
                        <p class="text-gray-800">
                            Tahririyat manzili: 150606, Farg'ona viloyati Farg'ona shahri
                        </p>
                    </div>
                </div>

                <!-- Phone Card -->
                <div class="bg-gray-100 p-6 rounded-2xl shadow-sm">
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <div class="w-1 h-5 bg-blue-500 mr-2"></div>
                        Telefon
                    </h2>
                    <div class="flex items-center">
                        <span class="text-gray-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </span>
                        <a href="tel:+998770007715" class="text-gray-800 hover:text-blue-500 transition-colors">
                            +998 77 000 77 15
                        </a>
                    </div>
                </div>

                <!-- Social Card -->
                <div class="bg-gray-100 p-6 rounded-2xl shadow-sm">
                    <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <div class="w-1 h-5 bg-blue-500 mr-2"></div>
                        Bog'lanish
                    </h2>
                    <div class="flex items-center">
                        <span class="text-gray-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </span>
                        <a href="mailto:@FarAdmin24" class="text-gray-800 hover:text-blue-500 transition-colors">
                            @FarAdmin24
                        </a>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class=" mt-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Xabaringizni yuboring</h2>

                <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Name Input -->
                    <div class="md:col-span-1">
                        <input type="text" v-model="formData.name" placeholder="Ism"
                            class="w-full p-3 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required />
                    </div>

                    <!-- Phone Input -->
                    <div class="md:col-span-1">
                        <input type="tel" v-model="formData.phone" placeholder="Telefon raqam"
                            class="w-full  p-3 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required />
                    </div>

                    <!-- Message Textarea -->
                    <div class="md:col-span-2">
                        <textarea v-model="formData.message" placeholder="Xabaringizni yozing." rows="6"
                            class="w-full p-3 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required></textarea>
                    </div>

                    <!-- Submit Button -->
                    <div class="md:col-span-2 ">
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl  border-none transition-colors">
                            XABARNI YUBORISH
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FormData {
    name: string;
    phone: string;
    message: string;
}

// Define the form data using ref
const formData = ref<FormData>({
    name: '',
    phone: '',
    message: ''
})

// Define the submit form function
const submitForm = async () => {
    try {
        // Send data to the API using fetch
        const response = await fetch('https://fargona24.uz/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
        })

        if (response.ok) {
            console.log('Form submitted successfully:', formData.value)
            // Clear the form after successful submission
            formData.value = { name: '', phone: '', message: '' }
            alert('Message sent successfully!')
        } else {
            console.error('Failed to send message:', response.status)
            alert('Failed to send message, please try again.')
        }
    } catch (error) {
        console.error('Error during submission:', error)
        alert('Error occurred while sending the message.')
    }
}
</script>