<template>
    <div v-if="error" class="fixed top-0 left-0 right-0 z-50 pointer-events-none" role="alert" aria-live="assertive">
        <div class="w-fit mx-auto m-3 p-3 bg-red-600 text-white text-sm text-center shadow rounded">
            <i class="fa-solid fa-triangle-exclamation"></i>
            {{ error }}
        </div>
    </div>
    <div class="flex flex-col w-full border border-gray-200 rounded">
        <div v-for="item in items" class="flex p-2 h-32 border-b border-gray-200 last:border-none">
            <DevItem :item="item" @remove="removeItem"></DevItem>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps<{
    items: any[];
}>();

const error = ref<string>("");

async function removeItem(id: string) {
    if (!confirm("本当に削除しますか？")) return;
    const config = useRuntimeConfig();
    const res = await fetch(`${config.public.apiBaseUrl}/data/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) {
        error.value = "アイテムの削除に失敗しました。";
        setTimeout(() => error.value = "", 5000);
        console.log(res);
        throw new Error(`通信エラー: ${res.status}`);
    }
    emit("reload");
}

const emit = defineEmits(["reload"]);
</script>