<template>
    <div>
        <NuxtLink class="relative w-fit cursor-pointer hover:opacity-90" :to="`/item?id=${item.id}`">
            <div class="relative">
                <img :src="item.url" alt="落とし物画像" class="w-full aspect-square object-cover rounded-t-lg" />
                <span class="absolute top-0 left-0 bg-gray-500/80 text-gray-50 px-3 rounded-br rounded-tl">{{ String(item.id + 10000) }}</span>
            </div>
        </NuxtLink>
        <div class="flex flex-col w-full p-2 border border-gray-200 bg-white rounded-b-lg gap-2 text-base sm:text-md">
            <NuxtLink :to="`/item?id=${item.id}`" class="font-bold hover:text-gray-500">{{ item.name }}</NuxtLink>
            <div class="flex flex-row flex-wrap text-white text-xs gap-2">
                <NuxtLink v-for="tag in item.tags" :to="`/tag?tag=${tag}`" class="px-2 py-1 bg-gray-500/80 rounded-full hover:bg-gray-600">{{ tag }}</NuxtLink>
            </div>
            <div class="flex flex-row text-gray-500 justify-end gap-2 overflow-hidden text-xs md:text-base">
                <p class="border-r border-gray-300 pr-2 text-nowrap">{{ item.location }}</p>
                <p>{{ item.date }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    item: {
        id: number;
        name: string;
        location: string;
        date: string;
        tags: string[];
        url: string;
    };
}>();
</script>