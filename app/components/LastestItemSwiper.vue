<template>
    <div class="w-full">
        <div v-if="error" class="text-center text-red-500 py-10">
            エラーが発生しました：{{ error }}
        </div>
        <div v-else>
            <ClientOnly>
                <Swiper v-if="data.length" class="px-2" :modules="modules" :autoplay="{ delay: 20e3 }" :space-between="12" :breakpoints="{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                    1536: { slidesPerView: 6 }
                }">
                    <SwiperSlide v-for="(item, i) in data" :key="i">
                        <Item :item="item" />
                    </SwiperSlide>
                </Swiper>
                <div v-else class="text-center text-gray-400 py-10">
                    表示できる落とし物はありません。
                </div>
            </ClientOnly>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const modules = [Autoplay];

const data = ref<any[]>([]);
const error = ref<string | null>(null);

onActivated(async () => {
    try {
        const config = useRuntimeConfig();
        const res = await fetch(`${config.public.apiBaseUrl}/data?amount=10`);
        if (!res.ok) throw new Error(`通信エラー: ${res.status}`);
        const result = await res.json() as any[];
        data.value = result;
    }
    catch (e: any) {
        error.value = e.message;
    }
});
</script>