<script lang="ts" setup>
interface Props {
  name: string;
  image: string;
}
defineProps<Props>();
</script>

<template>
  <div
    class="flex group relative items-center justify-center bg-gray-100 md:h-80 h-40 md:w-80 xl:w-150 w-screen rounded"
  >
    <div class="flex flex-col">
      <NuxtLink :href="`/collections/${name}`">
        <nuxt-img
          :height="500"
          class="md:h-80 h-40 object-cover md:w-80 xl:w-150 w-screen object-top md:group-hover:scale-99 md:transition md:duration-400"
          :src="image"
          alt=""
        />
        <span
          v-if="name === 'cars'"
          class="absolute md:bottom-6 right-6 bottom-2 font-melodrama md:group-hover:scale-110 md:transition md:duration-400 uppercase text-white font-bold text-2xl z-10"
          >{{ name }}</span
        >
        <span
          v-else
          class="absolute md:bottom-6 right-6 bottom-2 font-melodrama md:group-hover:scale-110 md:transition md:duration-400 uppercase text-black font-bold text-2xl z-10"
          >{{ name }}</span
        >
      </NuxtLink>
    </div>
  </div>
</template>
