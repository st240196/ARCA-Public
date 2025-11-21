<template>
    <div class="fixed inset-0 flex items-center justify-center z-60 p-4">
        <div class="fixed inset-0 bg-black/40 z-60" @click="emit('close')"></div>
        <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 pb-0 z-61 max-h-[90vh] overflow-y-auto">
            <header class="flex items-center justify-between py-4">
                <h2 class="text-lg font-semibold">登録フォーム</h2>
                <button class="text-gray-500 cursor-pointer" @click="emit('close')">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </header>
            <form @submit.prevent="onRegister">
                <div v-for="(row, idx) in rows" :idx="idx" class="row grid grid-cols-12 gap-2 p-4 items-start border-t border-gray-300 text-gray-600 ease-out duration-1000">
                    <input v-model="row.name" placeholder="物品名（例：傘）" class="col-span-12 sm:col-span-4 px-2 py-1 border rounded" />
                    <input v-model="row.location" placeholder="場所（例：図書館）" class="col-span-12 sm:col-span-4 px-2 py-1 border rounded" />
                    <input v-model="row.date" type="date" class="col-span-12 sm:col-span-4 px-2 py-1 border rounded" />
                    <label class="relative w-full py-1 col-span-12 border rounded bg-gray-100/60 cursor-text" for="tags-input">
                        <div class="flex flex-wrap text-sm min-h-6">
                            <div v-for="tag in row.tags" :key="tag" class="flex items-center pl-2">
                                <span class="text-nowrap hover:line-through hover:cursor-pointer" @click="row.tags.splice(row.tags.indexOf(tag), 1)">#{{ tag }}</span>
                            </div>
                            <input id="tags-input" class="px-2 focus-visible:outline-none" maxlength="10" placeholder="タグ (例: 鍵 服 水色)" autocomplete="off" @keydown.enter.prevent="e => addTag(idx, e.target)" @keydown.space.prevent="e => addTag(idx, e.target)" />
                        </div>
                    </label>
                    <DropField v-model="row.file" class="w-full col-span-12" />
                    <button type="button" class="col-start-12 w-full h-full text-sm ml-auto text-red-500 cursor-pointer hover:text-red-700" @click="removeRow(idx)">
                        <i class="fa-solid fa-trash text-lg"></i>
                    </button>
                </div>
                <div class="sticky bottom-0 w-full flex flex-col justify-center py-3 gap-1 bg-white border-t border-gray-300">
                    <div class="flex">
                        <button type="button" class="px-3 py-1.5 bg-blue-500 text-white rounded" @click="addRow">行を追加</button>
                        <div class="ml-auto flex gap-2">
                            <button type="button" class="px-3 py-1 border rounded cursor-pointer hover:bg-gray-300" @click="emit('close')">キャンセル</button>
                            <button type="submit" class="px-3 py-1.5 bg-green-600 text-white rounded cursor-pointer hover:opacity-80">登録</button>
                        </div>
                    </div>
                    <div v-if="error" class="text-sm ml-auto text-red-600">* {{ error }}</div>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import DropField from "./DropField.vue";

interface RegisterItem {
    name: string;
    location: string;
    date: string;
    tags: string[];
    file: File;
}

const error = ref("");

const rows = reactive<RegisterItem[]>([
    { name: "", location: "", date: new Date().toISOString().slice(0, 10), tags: [], file: new File([], "") }
]);

function addRow() {
    rows.push({ name: "", location: "", date: new Date().toISOString().slice(0, 10), tags: [], file: new File([], "") });
}

function removeRow(i: number) {
    rows.splice(i, 1);
    if (!rows.length) addRow();
}

function addTag(i: number, target: EventTarget | null = null) {
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.value) return;
    const row = rows[i];
    if (!row) return;
    if (!row.tags.includes(target.value))
        row.tags.push(target.value);
    target.value = "";
}

function onRegister() {
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row) continue;

        const elem = document.querySelector(`.row[idx="${i}"]`);
        if (!elem) return;
        
        const warn = () => {
            elem.scrollIntoView({ behavior: "smooth", block: "center" });
            elem.classList.add("bg-red-500/20");
            setTimeout(() => elem.classList.remove("bg-red-500/20"), 700);
        };

        if (!row.name.trim()) {
            error.value = "物品名は必須です。";
            warn();
            return;
        }
        if (!row.location.trim()) {
            error.value = "場所は必須です。";
            warn();
            return;
        }
        if (row.file.size === 0) {
            error.value = "画像ファイルは必須です。";
            warn();
            return;
        }
    }

    error.value = "";
    const payload = rows.map((item) => ({
        name: item.name.trim(),
        location: item.location.trim(),
        date: new Date(item.date).getTime(),
        tags: item.tags,
        file: item.file
    }));


    emitRegister(payload);
}


const emit = defineEmits(["close", "register"]);
const emitRegister = (p: any) => emit("register", p);
</script>