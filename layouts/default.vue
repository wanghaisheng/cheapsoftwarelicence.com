<script lang="ts" setup>
import "normalize.css";
import Upheader from "~/components/headers/upheader.vue";
import Downheader from "~/components/headers/downheader.vue";
import Tsxbar from "@/components/tsxbar.vue";
useHead({
  title: "CheapSoftwareLicences, Find your cheap software keys.",
  meta: [
    {
      name: "description",
      content: "Find your cheap software keys, secure and reliable software.",
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
    <ClientOnly><Cookie /></ClientOnly>
  </div>
</template>
