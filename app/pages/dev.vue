<template>
    <main class="max-w-6xl mx-auto p-6">
        <h1 class="text-2xl font-semibold">管理画面</h1>
        <div class="flex items-center gap-4 my-6">
            <div class="ml-auto h-10 flex items-center gap-2">
                <button
                    class="flex items-center gap-2 px-3 py-1.5 h-full bg-green-500 text-white rounded hover:opacity-90"
                    @click="openAddModal" aria-label="新規登録">
                    <span class="text-lg font-bold">＋</span>
                    <span class="hidden sm:inline">新規登録</span>
                </button>
                <input v-model="query" type="search" placeholder="検索（名前・場所）"
                    class="px-3 py-1.5 h-full border rounded text-sm w-48" />
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
    try {
        const data = new FormData();
        data.append("size", String(items.length));
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (!item) continue;
            const { file, ...meta } = item;
            const convert = await compress(file);
            // console.log(convert.size, convert);
            data.append(`meta_${i}`, JSON.stringify(meta));
            data.append(`file_${i}`, convert);
        }

        // alert(JSON.stringify([...data.entries()], null, 2));

        const config = useRuntimeConfig();
        const res = await fetch(`${config.public.apiBaseUrl}/data`, {
            method: "POST",
            body: data
        });

        // alert(JSON.stringify((await res.text()), null, 2));

        addModalOpen.value = false;

        fetchPanel();
    }
    catch (e: any) {
        error.value = e.message;
    }
}

// 画像圧縮
/**
 * 画像を JPEG に変換し、1MB以下になるまで圧縮する
 */
async function compress(file: File, maxKB = 1024): Promise<File> {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    let width = bitmap.width;
    let height = bitmap.height;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(bitmap, 0, 0);

    let quality = 0.9;
    let blob: Blob;

    while (true) {
        blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob(
                (b) => resolve(b!),
                "image/jpeg",
                quality
            )
        );

        if (blob.size / 1024 <= maxKB || quality <= 0.3) {
            break;
        }

        quality -= 0.05;
    }

    while (blob.size / 1024 > maxKB) {
        width *= 0.85;
        height *= 0.85;

        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        quality = Math.min(quality, 0.8);

        blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob(
                (b) => resolve(b!),
                "image/jpeg",
                quality
            )
        );
    }

    return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
        type: "image/jpeg"
    });
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