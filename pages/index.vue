<script lang="ts" setup>
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
  <div>
    <div
      class="relative lg:h-60 h-40 w-screen bg-black flex items-center justify-center"
    >
      <img
        class="lg:h-60 h-40 object-cover w-full"
        src="/bannersoftware.png"
        alt="banner"
      />
      <div
        class="absolute lg:h-60 h-40 z-10 w-full bg-gradient-to-t from-white/30 opacity-100 to-transparent"
      ></div>
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
            :price="Number(item.price)"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-10 items-center">
      <div class="grid md:grid-cols-2 grid-cols-1 mt-0.5 md:gap-6 md:mt-6">
        <collection-block name="office" image="/collectionimages/office.jpg" />
      </div>
    </div>
  </div>
</template>
