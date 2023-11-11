<script lang="ts" setup>
import { useCartStore } from "@/stores/cart-store";
import ProductReview from "@/components/ProductReview.vue";

const { params, query } = useRoute();
const isOpenToast = ref(false)

useHead({
  title: `CheapSoftwareLicences, ${params.name}`,
  meta: [
    {
      name: "description",
      content: `Get ${params.name} with your CheapSoftwareLicences, software and productkeys.`,
    },
  ],
});
const store = useCartStore();

const { data } = useAsyncData("getproduct", async () => {
  return await $fetch("/api/getProduct", {
    method: "POST",
    body: { id: query.id },
  });
});

const handleAddToCart = (id: number) => {
  store.addToCart(id);
  // @ts-ignore
  const input = document.getElementById("addToCart");
  isOpenToast.value = true

  setTimeout(() => {
    input?.blur();
 

  }, 1000);

  setTimeout(() => {
    isOpenToast.value = false
  },6000)
};
</script>

<template>
  <div class="h-12 w-11/12 md:w-80 p-5 animate-bounce-in-left mx-auto bg-black border-groove text-white text-xl z-40 border-1 fixed bottom-6 md:right-6 flex"
   v-if="isOpenToast">
    <span class="font-bold">Product succesfully added to the cart.</span>
  </div>
  <div
    class="relative h-20 mt-20 mb-10 bg-sky-700 flex items-center justify-center"
  ></div>
  <div class="w-screen flex justify-center items-center min-h-screen">
    <div
      class="w-11/12 md:flex md:mb-10 mb-40 grid md:mt-0 mt-20 grid-cols-1 gap-20 md:gap-0"
    >
      <div class="">
        <div class="">
          <nuxt-img
            v-if="data?.data?.image"
            :height="500"
            :width="500"
            class="w-80 h-80 mx-auto transition hover:scale-102 duration-700"
            :src="`/productimages/${(data?.data?.image as string)}.webp`"
            :alt="(data?.data?.name as string)"
          />
          <div
            v-else
            class="h-80 w-80 border-1 border-groove border-black"
          ></div>
          <div class="flex gap-2 mt-4">
            <nuxt-img
              v-if="data?.data?.image"
              :height="500"
              class="w-20 h-20 p-0.5 border bg-gray-100 border-groove transition hover:scale-102 duration-700"
              :src="`/productimages/${(data?.data?.image as string)}2.webp`"
              :alt="(data?.data?.name as string)"
            />
            <nuxt-img
              v-if="data?.data?.image"
              :height="500"
              class="w-20 h-20 p-0.5 border bg-gray-100 border-groove transition hover:scale-102 duration-700"
              :src="`/productimages/${(data?.data?.image as string)}3.webp`"
              :alt="(data?.data?.name as string)"
            />
          </div>
        </div>
      </div>
      <div class="6/12">
        <div class="md:px-16 px-2 flex flex-col">
          <span class="uppercase text-sm text-purple-700 font-bold"
            >Item id .{{ data?.data?.id }}</span
          >
          <div class="flex gap-1">
            <span>Collection: </span><span>{{ data?.data?.collection }}</span>
          </div>
          <span class="mt-1 text-4xl">{{ data?.data?.name }}</span>
          <span class="mt-4 text-lg font-bold">{{
            data?.data?.descriptiontitle
          }}</span>
          <span class="">{{ data?.data?.description }}</span>
          <span
            v-if="data?.data?.descriptiontitle2 !== 'null'"
            class="mt-4 text-lg font-bold"
            >{{ data?.data?.descriptiontitle2 }}</span
          >
          <span v-if="data?.data?.description2 !== 'null'" class="">{{
            data?.data?.description2
          }}</span>
          <div class="flex gap-2 items-end">
            <div
              class="text-2xl px-4 py-3 bg-gray-900 text-white font-bold mt-2"
            >
              <span>€ {{ Number(data?.data?.price)?.toFixed(2) }},-</span>
            </div>
            <div>
              <button
                id="first_name"
                @click="handleAddToCart(data?.data?.id as number)"
                class="focus:animate-fade-in bg-black no-underline py-4 text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer disabled:cursor-default hover:bg-gray-900"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div class="mt-10 flex flex-col">
            <span class="text-lg font-bold mt">Product properties</span>
            <div class="grid grid-cols-2 w-full gap-1">
              <span v-if="data?.data?.spec1 !== 'null'">Type</span>
              <span v-if="data?.data?.spec1 !== 'null'">{{
                data?.data?.spec1
              }}</span>
              <span v-if="data?.data?.spec2 !== 'null'"></span>
              <span v-if="data?.data?.spec2 !== 'null'">{{
                data?.data?.spec2
              }}</span>
              <span v-if="data?.data?.spec3 !== 'null'"></span>
              <span v-if="data?.data?.spec3 !== 'null'">{{
                data?.data?.spec3
              }}</span>
              <span v-if="data?.data?.spec4 !== 'null'"></span>
              <span v-if="data?.data?.spec4 !== 'null'">{{
                data?.data?.spec4
              }}</span>
              <span v-if="data?.data?.spec5 !== 'null'"></span>
              <span v-if="data?.data?.spec5 !== 'null'">{{
                data?.data?.spec5
              }}</span>
              <span v-if="data?.data?.spec6 !== 'null'"></span>
              <span v-if="data?.data?.spec6 !== 'null'">{{
                data?.data?.spec6
              }}</span>
              <span v-if="data?.data?.spec7 !== 'null'"></span>
              <span v-if="data?.data?.spec7 !== 'null'">{{
                data?.data?.spec7
              }}</span>
              <span v-if="data?.data?.spec8 !== 'null'"></span>
              <span v-if="data?.data?.spec8 !== 'null'">{{
                data?.data?.spec8
              }}</span>
            </div>
          </div>
          <section class="mt-6">
            <product-review :product-id="Number(query.id)" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
