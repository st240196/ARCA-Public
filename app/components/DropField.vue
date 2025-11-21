<template>
    <div class="max-w-md mx-auto p-1">
        <div class="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 cursor-pointer transition hover:bg-blue-50 hover:border-blue-400 hover:text-gray-900" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileInput">
            <div v-if="!previewUrl" class="mt-4 text-center">
                ファイルをここにドラッグ＆ドロップするか、クリックして選択してください
                <br>
                <small class="text-gray-400">PNG / JPG / GIF / WebP をサポート</small>
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleSelect" />
            </div>
            <div v-else>
                <img :src="previewUrl" alt="プレビュー" class="max-w-full max-h-60 mx-auto rounded-lg shadow-md border border-gray-200" />
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleSelect" />
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: File, // 親の値を受け取る
});

const emit = defineEmits(["update:modelValue"]);

const fileInput = ref(null);
const previewUrl = ref("");

// 親の file が変更されたらプレビュー更新
watch(
    () => props.modelValue,
    (file) => {
        if (file instanceof File && file.size > 0) {
            const reader = new FileReader();
            reader.onload = () => (previewUrl.value = reader.result);
            reader.readAsDataURL(file);
        }
        else {
            previewUrl.value = "";
        }
    },
    { immediate: true }
);

function triggerFileInput() {
    fileInput.value?.click();
}

function handleSelect(event) {
    const file = event.target.files[0];
    handleFile(file);
}

function handleDrop(event) {
    const file = event.dataTransfer.files[0];
    handleFile(file);
}

function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
        alert("画像ファイルを選択してください。");
        return;
    }
    emit("update:modelValue", file); // ←ここがポイント
}
</script>
