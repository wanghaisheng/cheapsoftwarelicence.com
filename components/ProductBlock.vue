<script lang="ts" setup>
import { useCartStore } from "@/stores/cart-store";
const store = useCartStore();

interface Props {
  name: string;
  image: string;
  id: number;
  price: number;
}
defineProps<Props>();
</script>
<template>
  <NuxtLink :to="`/details/${name}?id=${id}`">
    <nuxt-img
      :height="500"
      class="relative absolute h-80 w-80 object-cover"
      :src="`/productimages/${image}.webp`"
      alt="image"
    />
    <div class="absolute bottom-4 right-4 flex flex-col">
      <span class="text-2xl px-4 py-3 bg-gray-900 text-white font-bold mt-2"
        >€ {{ price?.toFixed(2) }}</span
      >
    </div>
  </NuxtLink>
</template>
