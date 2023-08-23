<script lang="ts" setup>
import { useCartStore } from "../stores/cart-store";
const store = useCartStore();

definePageMeta({
  layout: "default",
});

const { data, error, refresh } = await useAsyncData("getProducts", () =>
  $fetch("/api/getProducts", {
    method: "POST",
    body: {
      cartItems: [],
    },
  })
);
const products = data.value?.data;
</script>

<template>
  <div v-if="products">
    <div class="relative h-80 bg-sky-700 flex items-center justify-center">
      <div>Banner foto</div>

      <nuxt-img
        :height="500"
        src="/collection.jpg"
        alt="dalle"
        class="object-cover object-center absolute h-80 z-10 w-screen bg-gradient-to-t from-white to-transparent"
      />
      <div
        class="absolute h-80 z-10 flex items-center justify-center w-screen bg-gradient-to-t from-white/90 to-transparent"
      >
        <span class="font-melodrama text-5xl tracking-6 text-black text-shadow"
          >TRENDING</span
        >
      </div>
    </div>
    <div class="flex flex-col items-center mt-6">
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
      >
        <div
          class="flex relative items-center justify-center h-80 w-80"
          :key="i"
          v-for="(item, i) in products"
        >
          <product-block
            :name="(item.name as string)"
            :image="(item.image as string)"
            :id="item.id"
            :price="(item.price as number)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
