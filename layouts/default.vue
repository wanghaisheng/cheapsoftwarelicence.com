<script lang="ts" setup>
import "normalize.css";
import Upheader from "~/components/headers/upheader.vue";
import Downheader from "~/components/headers/downheader.vue";
import Tsxbar from "@/components/tsxbar.vue";
useHead({
  title: "Trend Dad, Acquire the  latest trends you're looking for.",
  meta: [
    {
      name: "description",
      content:
        "Get the latest trends with your trend dad, buy products and stay trending.",
    },
  ],
});
</script>

<template>
  <div class="min-h-screen font-inter w-screen">
    <ClientOnly><Upheader /></ClientOnly>
    <ClientOnly><Downheader /></ClientOnly>
    <slot />
    <Footer />
    <Tsxbar />
    <ClientOnly><Cookie /></ClientOnly>
  </div>
</template>
