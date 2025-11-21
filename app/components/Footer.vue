<template>
    <footer class="flex w-full h-16 text-sm bg-gray-200 items-center justify-center whitespace-nowrap">
        Copyright © {{ duration }} ARCA. All Rights Reserved.
    </footer>
</template>
<script setup lang="ts">
    const begin = 2025;
    const end = new Date().getFullYear();
    const duration = begin === end ? begin : `${begin} - ${end}`;
</script>
