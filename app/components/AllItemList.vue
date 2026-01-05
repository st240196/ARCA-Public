<template>
    <div class="w-full">
        <div v-if="error" class="text-center text-red-500 py-10">
            エラーが発生しました：{{ error }}
        </div>
        <div v-else>
            <div class="flex flex-row flex-wrap pl-3">
                <div v-for="item in filteredItems" class="pr-3 pt-3 w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
                    <Item :item="item" class="mb-4"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Item from "./Item.vue";
import { computed, onMounted } from "vue";

const props = defineProps<{
    query?: string;
    filterByTag?: boolean;
}>();

const items = ref<any[]>([]);
const error = ref<string | null>(null);

const filteredItems = computed(() => {
    let filtered = items.value;
    if (props.filterByTag && props.query) {
        filtered = filtered.filter(item => item.tags.includes(props.query));
    } else if (props.query) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(props.query!.toLowerCase()) ||
            item.location.toLowerCase().includes(props.query!.toLowerCase()) ||
            item.tags.some((tag: string) => tag.toLowerCase().includes(props.query!.toLowerCase()))
        );
    }
    return filtered;
});

const fetchData = async () => {
    try {
        const config = useRuntimeConfig();
        const url = `${config.public.apiBaseUrl}/data?amount=60`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`通信エラー: ${res.status}`);
        const result = await res.json() as any[];
        items.value = result;
    }
    catch (e: any) {
        error.value = e.message;
        console.error('Fetch error:', e);
    }
};

onActivated(fetchData);

defineExpose({ reload: fetchData });
</script>