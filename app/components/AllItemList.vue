<template>
    <div class="w-full">
        <div v-if="error" class="text-center text-red-500 py-10">
            エラーが発生しました：{{ error }}
        </div>
        <div v-else class="flex flex-row flex-wrap pl-3">
            <div v-for="item in items" class="pr-3 pt-3 w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
                <Item :item="item" class="mb-4"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Item from "./Item.vue";

const items = ref<any[]>([]);
const error = ref<string | null>(null);
onActivated(async () => {
    try {
        const config = useRuntimeConfig();
        const res = await fetch(`${config.public.apiBaseUrl}/data?amount=60`);
        if (!res.ok) throw new Error(`通信エラー: ${res.status}`);
        const result = await res.json() as any[];
        items.value = result;
    }
    catch (e: any) {
        error.value = e.message;
    }
});
</script>