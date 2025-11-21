<template>
    <main class="max-w-6xl mx-auto p-6">
        <h1 class="text-2xl font-semibold">管理画面</h1>
        <div class="flex items-center gap-4 my-6">
            <div class="ml-auto h-10 flex items-center gap-2">
                <button class="flex items-center gap-2 px-3 py-1.5 h-full bg-green-500 text-white rounded hover:opacity-90" @click="openAddModal" aria-label="新規登録">
                    <span class="text-lg font-bold">＋</span>
                    <span class="hidden sm:inline">新規登録</span>
                </button>
                <input v-model="query" type="search" placeholder="検索（名前・場所）" class="px-3 py-1.5 h-full border rounded text-sm w-48" />
            </div>
        </div>
        <div v-if="error" class="text-center text-red-500 py-10">
            エラーが発生しました: {{ error }}
        </div>
        <DevItemPanel v-else :items="items" @reload="fetchPanel" />
        <DevAddModal v-if="addModalOpen" @close="addModalOpen = false" @register="bulkRegister" />
    </main>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import DevAddModal from "../components/DevAddModal.vue";

interface RegisterItem {
    name: string;
    location: string;
    date: number;
    tags: string[];
    file: File;
}

const items = ref<any[]>([]);
const error = ref<string>("");
const query = ref("");
const addModalOpen = ref(false);

function openAddModal() {
    addModalOpen.value = true;
}

async function fetchPanel() {
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
}

async function bulkRegister(items: RegisterItem[]) {
    const data = new FormData();
    data.append("size", String(items.length));
    items.forEach(({ file, ...meta }, i) => {
        data.append(`meta_${i}`, JSON.stringify(meta));
        data.append(`file_${i}`, file);
    });

    const config = useRuntimeConfig();
    await fetch(`${config.public.apiBaseUrl}/data`, {
        method: "POST",
        body: data,
    });

    addModalOpen.value = false;

    fetchPanel();
}

// ブラウザのリロード・タブ閉じ・直接URL移動時の確認
function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (addModalOpen.value) {
        event.preventDefault();
    }
}

onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    fetchPanel();
});
onBeforeUnmount(() => window.removeEventListener("beforeunload", handleBeforeUnload));
</script>