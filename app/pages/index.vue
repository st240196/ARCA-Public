<template>
    <main class="px-3 py-6 bg-gray-50">
        <div class="flex flex-col items-center justify-center mt-6 mb-12 w-full">
            <h1 class="m-0 w-fit text-4xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-flow">
                Welcome to ARCA
            </h1>
        </div>
        <h1 class="m-0 mb-3 text-3xl font-bold">
            <i class="fas fa-star text-yellow-500"></i>
            最新の落とし物
        </h1>
        <LastestItemSwiper class="px-3 mb-10" />
        <h1 class="m-0 mb-3 text-3xl font-bold">
            <i class="fas fa-fire text-orange-500"></i>
            全ての落とし物
        </h1>
        <div class="mb-6 flex justify-end">
            <input v-model="searchQuery" type="search" placeholder="検索（タイトル・場所・タグ）" class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <AllItemList :query="searchQuery" class="mb-10" />
    </main>
    <Footer />
</template>
<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
</script>
<style scoped>
@keyframes gradient-flow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient-flow {
    animation: gradient-flow 4s ease infinite;
}
</style>