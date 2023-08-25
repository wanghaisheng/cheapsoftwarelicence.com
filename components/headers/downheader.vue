<script lang="ts" setup>
const isOpenCollections = ref(false);

const { status, data, signOut } = useAuth();
</script>

<template>
  <div
    class="h-10 flex bg-gray-800 w-full mx-auto justify-between items-center text-white"
  >
    <div class="flex items-center md:space-x-4 ml-1">
      <div
        @click="isOpenCollections = !isOpenCollections"
        class="group flex items-center"
      >
        <button
          class="md:text-md lg:text-xl text-white bg-gray-800 text-sm border-none cursor-pointer"
        >
          Buy Software
        </button>
        <i
          class="-ml-2 cursor-pointer i-mdi-chevron-down group-hover:text-gray-600"
        />
      </div>
      <!-- Dropdown menu -->
      <div
        v-if="isOpenCollections"
        class="absolute z-30 p-2 top-27 font-normal bg-white divide-y divide-gray-100 shadow w-44"
      >
        <NuxtLink
          @click="isOpenCollections = false"
          href="/collections/office"
          class="block text-black hover:text-white hover:bg-gray-800 decoration-none px-1 py-2 cursor-pointer"
          >office</NuxtLink
        >
      </div>

      <div>
        <NuxtLink @click="isOpenCollections = false" href="/trending"
          ><button
            class="text-white border-none md:text-md lg:text-xl text-sm bg-gray-800 cursor-pointer"
          >
            Trending Software
          </button></NuxtLink
        >
      </div>
    </div>

    <div class="flex items-end space-x-2 md:mr-4 mr-2">
      <div v-if="status === 'authenticated'" class="xl:flex xl:flex-col hidden">
        <span class="text-sm">{{ data?.user?.email }}</span>
      </div>
      <div>
        <NuxtLink
          to="/sign-in"
          class="bg-gray-800 text-white mr-2 py-1 cursor-pointer"
          v-if="status !== 'authenticated'"
        >
          Sign In / Sign up
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
