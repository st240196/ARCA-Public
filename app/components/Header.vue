<template>
    <header class="sticky flex top-0 items-center w-full h-16 p-2 bg-white shadow-md z-40">
        <NuxtLink class="w-20 h-20 ml-2 mr-6 transition-all duration-300 hover:scale-120" href="./">
            <img src="/arca.png" alt="Arca" loading="lazy" />
        </NuxtLink>
        <nav class="hidden sm:flex bg-gradient-to-r from-orange-500 via-lime-500 to-sky-500 bg-clip-text text-transparent font-bold flex-row gap-6">
            <NuxtLink class="p-2 text-xl hover:text-white/40" href="./">ホーム</NuxtLink>
            <NuxtLink class="p-2 text-xl hover:text-white/40" href="./stats">統計</NuxtLink>
            <NuxtLink class="p-2 text-xl hover:text-white/40" href="./faq">FAQ</NuxtLink>
            <NuxtLink class="p-2 text-xl hover:text-white/40" href="./credit">クレジット</NuxtLink>
        </nav>
        <button class="flex items-center justify-center w-16 h-16 sm:hidden ml-auto cursor-pointer z-100" @click="toggle">
            <i class="fa-solid fa-bars fa-2xl absolute transition-all duration-300 z-100" :class="open ? 'scale-0' : 'scale-100'"></i>
            <i class="fa-solid fa-xmark fa-2xl absolute transition-all duration-300 z-100" :class="open ? 'scale-100' : 'scale-0'"></i>
        </button>
        <div class="fixed inset-0 sm:hidden transition-all duration-300 z-40" :class="open ? 'pointer-events-auto' : 'pointer-events-none'">
            <div class="absolute inset-0 bg-black/40" :class="open ? 'block' : 'hidden'" @click="close"></div>
            <div class="absolute p-4 top-0 w-64 h-full bg-white rounded-tl-2xl rounded-bl-2xl shadow-lg transition-all duration-300" :class="open ? 'right-0' : 'right-[-32rem]'" @click.stop>
                <nav class="flex flex-col bg-gradient-to-b from-orange-500 via-lime-500 to-sky-500 bg-clip-text text-transparent mt-10 gap-3">
                    <NuxtLink class="p-2 text-xl font-bold hover:text-white/40" @click="close" href="./">ホーム</NuxtLink>
                    <NuxtLink class="p-2 text-xl font-bold hover:text-white/40" @click="close" href="./stats">統計</NuxtLink>
                    <NuxtLink class="p-2 text-xl font-bold hover:text-white/40" @click="close" href="./faq">FAQ</NuxtLink>
                    <NuxtLink class="p-2 text-xl font-bold hover:text-white/40" @click="close" href="./credit">クレジット</NuxtLink>
                    <div class="border-t border-gray-300"></div>
                </nav>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const toggle = () => {
    open.value = !open.value;
};

const close = () => {
    open.value = false;
};
</script>