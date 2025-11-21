<template>
    <div v-show="isReady" class="min-h-screen bg-gray-50 p-4 flex justify-center items-start">
        <div class="w-full max-w-lg bg-white rounded-3xl shadow p-6">

            <!-- ID -->
            <p class="text-gray-600 text-sm mb-1">落とし物番号: {{ item.id + 10000 }}</p>


            <!-- タイトル -->
            <h1 class="text-xl font-bold mb-3">{{ item.name }}</h1>

            <!-- 画像 -->
            <div class="w-full aspect-w-1 aspect-h-1 mb-6 overflow-hidden rounded-xl bg-gray-200">
                <img :src="item.url" alt="item image" class="w-full h-full object-cover" />
            </div>

            <!-- 場所 -->
            <p class="text-gray-700 mb-1">発見場所: {{ item.location }}</p>


            <!-- 見つかった時間 -->
            <p class="text-gray-700 mb-4">発見時間: {{ item.date }}</p>


            <!-- タグ -->
            <h3 class="font-semibold mb-2">タグ</h3>
            <div class="flex flex-row flex-wrap text-white text-xs gap-2">
                <a v-for="tag in item.tags" class="px-2 py-1 bg-gray-500/80 rounded-full">{{ tag }}</a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const item = ref<any>({});
const isReady = ref<boolean>(false);

async function fetchItem() {
    isReady.value = false;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) throw showError({ statusCode: 404 });

    const config = useRuntimeConfig();
    const res = await fetch(`${config.public.apiBaseUrl}/data/${id}`);
    if (!res.ok) throw showError({ statusCode: res.status });
    const result = await res.json();
    item.value = result;

    isReady.value = true;
}

onActivated(fetchItem);
</script>