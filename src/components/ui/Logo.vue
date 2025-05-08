<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
    router.push('/');
}
</script>

<template>
    <div>
        <img @click="goHome" src="@/assets/icons/logo2.png" class="h-8 cursor-pointer" alt="Farg'ona 24 Logo" />
    </div>
</template>
