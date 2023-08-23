<script lang="ts" setup>
const { data, signOut } = useAuth();
const user = data.value?.user;

if (!user) {
  navigateTo("/sign-in");
}

definePageMeta({
  middleware: "auth",
});

const { data: userData } = await useAsyncData("getUser", () =>
  $fetch("/api/getUser", {
    method: "POST",
    body: {
      name: user?.name,
      email: user?.email,
    },
  })
);
</script>

<template>
  <div
    v-if="user && userData"
    class="flex md:w-4/6 w-full mx-auto min-h-screen mb-20 mt-10"
  >
    <sidebar />
    <div class="md:ml-20 ml-2">
      <h1>Your Account</h1>
      <div
        class="py-10 flex flex-col gap-2 px-4 bg-gray-800 text-white font-bold"
      >
        <span class="text-md lg:text-2xl">Hello {{ user?.name }},</span>
        <span class="md:text-sm text-xs"
          >Here, you'll find all the relevant information about your
          account</span
        >
      </div>
      <div class="mt-2">
        <span class="font-bold text-lg">Credentials & Settings</span>
        <div class="border flex border-groove border-1 border-black py-6 px-2">
          <div>
            <span class="font-bold text-md">This is you</span>
            <div class="gap-1 flex flex-col mt-2">
              <span>{{ user?.name }}</span>
              <div>
                <span>{{ userData?.data[0]?.street }}</span>
                <span>{{ userData?.data[0]?.number }}</span>
              </div>
              <div class="flex gap-1">
                <span>{{ userData?.data[0]?.zipcode }}</span>
                <span>{{ userData?.data[0]?.country }}</span>
              </div>
              <div class="flex gap-1">
                <span>Customer-id:</span>
                <span>{{ userData?.data[0]?.id }}</span>
              </div>
              <span class="mt-4">{{ userData?.data[0]?.email }}</span>
            </div>
          </div>
          <div>
            <img
              v-if="user?.image"
              :src="user?.image"
              class="h-20 w-20 rounded-full"
            />
          </div>
        </div>
        <NuxtLink to="/account/settings">Manage your settings</NuxtLink>
      </div>
      <div class="mt-6">
        <span class="font-bold text-lg">Vouchers & Credits</span>
        <div class="border border-groove border-1 border-black py-6 pb-16 px-2">
          <div class="flex flex-col">
            <span class="font-bold text-md">Received voucher?</span>
            <span class="mt-2"
              >Check the amount and add it into your account.</span
            >
          </div>
        </div>
        <NuxtLink to="/account/vouchers">Check the overview</NuxtLink>
      </div>
      <div class="mt-4">
        <span
          class="underline cursor-pointer text-purple-500"
          @click="signOut()"
          >Sign out</span
        >
      </div>
    </div>
  </div>
</template>
