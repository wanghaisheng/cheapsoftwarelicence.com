<script lang="ts" setup>
const isOpenCollections = ref(false);

const { data, signOut } = useAuth();
const handleSignOut = async () => {
  await signOut();
  navigateTo("/sign-in");
};
</script>

<template>
  <div
    class="h-10 flex bg-white md:w-4/6 w-full mx-auto justify-between items-center text-black mb-1"
  >
    <div class="flex items-center md:space-x-4 ml-1">
      <div
        @click="isOpenCollections = !isOpenCollections"
        class="group flex items-center"
      >
        <button
          class="bg-white md:text-md lg:text-xl text-sm text-black border-none cursor-pointer group-hover:text-gray-600"
        >
          Top Collections
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
          class="block text-black hover:text-white hover:bg-black decoration-none px-1 py-2 cursor-pointer"
          >office</NuxtLink
        >
      </div>

      <div>
        <NuxtLink @click="isOpenCollections = false" href="/trending"
          ><button
            class="bg-white border-none md:text-md lg:text-xl text-sm hover:text-gray-600 cursor-pointer"
          >
            Trending
          </button></NuxtLink
        >
      </div>
      <div>
        <NuxtLink @click="isOpenCollections = false" href="/account/orders"
          ><button
            class="bg-white border-none md:text-md lg:text-xl text-sm hover:text-gray-600 cursor-pointer"
          >
            Orders
          </button></NuxtLink
        >
      </div>
    </div>

    <div class="flex items-end space-x-2 md:mr-0 mr-1">
      <div v-if="data?.user?.email" class="xl:flex xl:flex-col hidden">
        <span class="text-sm">{{ data?.user.email }}</span>
      </div>
      <div>
        <button
          class="bg-white text-black"
          @click="handleSignOut"
          v-if="data?.user?.email"
        >
          Sign Out
        </button>
        <NuxtLink
          to="/sign-in"
          class="bg-white text-black"
          v-if="!data?.user?.email"
        >
          Sign In
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
