<script setup lang="ts">
import { RouterView } from 'vue-router';
import SideBar from '@/components/sidebar/Sidebar.vue'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue';
</script>
<template>
    <div class="bg-[#eaeaea] ">
        <SideBar />
        <Header />
        <main class=" min-h-screen  pt-20  ">
            <RouterView />
        </main>
    </div>
     <Footer  />
    </template>