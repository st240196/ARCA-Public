<template>
    <NuxtLink class="relative cursor-pointer hover:opacity-90 aspect-square" :href="`/item?id=${item.id}`">
        <img :src="item.url" alt="落とし物画像" class="h-full object-cover rounded" />
    </NuxtLink>
    <div class="relative flex flex-col mx-2 w-full">
        <NuxtLink class="font-bold text-lg w-fit hover:text-gray-500" :href="`/item?id=${item.id}`">{{ item.name }}</NuxtLink>
        <div class="flex flex-row flex-wrap w-fit text-white gap-2 text-xs">
            <a v-for="tag in item.tags" class="px-2 py-1 bg-gray-500/80 rounded-full">{{ tag }}</a>
        </div>
        <div class="flex flex-row mt-auto ml-auto text-gray-500 justify-end gap-2 overflow-hidden text-xs md:text-base">
            <p class="border-r border-gray-300 pr-2 text-nowrap">{{ item.location }}</p>
            <p>{{ item.date }}</p>
        </div>
        <button type="button" class="absolute top-1 right-1 text-sm ml-auto text-red-500 cursor-pointer hover:text-red-700" @click="emit('remove', item.id)">
            <i class="fa-solid fa-trash text-lg"></i>
        </button>
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
    }
}>();

const emit = defineEmits(["remove"]);
</script>