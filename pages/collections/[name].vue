<script lang="ts" setup>
definePageMeta({
  layout: "default",
});
const { params } = useRoute();
const { data, error, refresh } = await useAsyncData(
  "getCollectionProducts",
  () =>
    $fetch("/api/getCollectionProducts", {
      method: "POST",
      body: {
        collection: params.name,
      },
    })
);
const products = data.value?.data;
</script>

<template>
  <div v-if="products">
    <div class="relative h-80 bg-purple-400 flex items-center justify-center">
      <div>Banner foto</div>
      <nuxt-img
        :height="500"
        :src="`/collectionimages/${params.name}.jpg`"
        alt="dalle"
        class="object-cover object-center absolute h-80 z-10 w-screen bg-gradient-to-t from-white to-transparent"
      />
      <div
        class="absolute h-80 z-10 flex items-center justify-center w-screen bg-gradient-to-t from-white/90 to-transparent"
      >
        <span
          class="font-melodrama text-5xl uppercase tracking-6 text-black text-shadow"
          >{{ params.name }}</span
        >
      </div>
    </div>
    <div class="flex flex-col p-2 mt-6 items-center">
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
      >
        <div
          class="flex relative items-center justify-center h-80 w-80"
          :key="i"
          v-for="(item, i) in products"
        >
          <product-block
            :name="(item?.name as string)"
            :image="(item?.image as string)"
            :id="item?.id"
            :price="(item.price as number)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
