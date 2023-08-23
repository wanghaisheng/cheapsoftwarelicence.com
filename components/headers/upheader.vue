<script lang="ts" setup>
import { useCartStore } from "../../stores/cart-store";
const store = useCartStore();
const { data } = useAuth();
const user = data.value?.user;
const openPopup = ref(false);
const email = ref("");
const isLoading = ref(false);
const isWrongEmail = ref(false);
const isSendEmail = ref(false);

const sendReference = async () => {
  const regex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  const isMatch = email.value.match(regex);
  if (!isMatch) {
    isWrongEmail.value = true;
    email.value = "";
    setTimeout(() => {
      isWrongEmail.value = false;
    }, 3000);
  } else {
    isLoading.value = true;
    await $fetch("/api/sendreference", {
      body: { email: email.value },
      method: "POST",
    });
    isSendEmail.value = true;
    email.value = "";
    setTimeout(() => {
      isSendEmail.value = false;
    }, 3000);
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    v-if="openPopup"
    class="fixed top-0 left-0 right-0 z-40 h-screen flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="relative py-10 z-50 px-10 bg-white border border-groove border-gray-300"
    >
      <span
        @click="openPopup = false"
        class="absolute top-2 right-2 cursor-pointer text-xl"
        >X</span
      >
      <div class="flex flex-col">
        <label>Email:</label>
        <input
          required
          v-model="email"
          placeholder="Your email"
          type="text"
          class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
        <span class="text-red-500" v-if="isWrongEmail"
          >Email is not correct</span
        >
        <span class="text-blue-500" v-if="isSendEmail"
          >Please check your inbox.</span
        >
        <button
          @click="sendReference"
          :disabled="isLoading"
          class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        >
          {{ isLoading ? "Sending" : "Send code" }}
        </button>
      </div>
    </div>
  </div>
  <div
    class="absolute z-20 gap-1 flex top-0 h-6 w-screen items-center justify-center bg-white text-xs text-black"
  >
    <span>Get 10% off, to get the code</span
    ><span class="underline cursor-pointer" @click="openPopup = true"
      >click here</span
    ><span>!</span>
  </div>
  <NuxtLink
    href="/"
    class="absolute flex gap-1 items-center top-10 md:top-6 md:left-8 lg:left-16 lef-2 decoration-none ml-4"
    ><nuxt-img
      :height="500"
      class="md:h-12 h-4 w-auto"
      src="/cheapsoftwarelicence.png"
      alt=""
    />
  </NuxtLink>
  <div
    class="h-10 mt-6 flex bg-white md:w-4/6 w-full mx-auto justify-between items-center text-black"
  >
    <div></div>
    <div class="flex mt-2 items-center gap-2 mr-2">
      <div class="flex items-center space-x-2">
        <div class="md:flex items-center space-x-2 hidden">
          <NuxtLink href="/help"
            ><div class="i-mdi-help-circle-outline text-2xl text-black"
          /></NuxtLink>
          <NuxtLink v-if="user" href="/account"
            ><div class="i-mdi-account-outline text-2xl text-black"
          /></NuxtLink>
          <NuxtLink v-else href="/sign-in"
            ><div class="i-mdi-account-outline text-2xl text-black"
          /></NuxtLink>
          <!-- <div class="i-mdi-cards-heart-outline text-2xl text-black" /> -->
          <NuxtLink href="/terms"
            ><div class="i-mdi-ruler-square-compass text-2xl text-black"
          /></NuxtLink>
          <NuxtLink href="/cart" class="flex pl-4 items-center"
            ><div class="i-mdi-shopping-outline text-2xl text-black" />
            <div class="group hover:text-gray-600">
              <span
                class="bg-white group-hover:bg-white text-black rounded-full px-2 py-1"
                >{{ store.getCart.length }}</span
              >
            </div></NuxtLink
          >
        </div>
      </div>
      <NuxtLink href="/cart" class="flex md:hidden pl-4 items-center"
        ><div class="i-mdi-shopping-outline text-2xl text-black" />
        <div class="group hover:text-gray-600">
          <span
            class="bg-white group-hover:bg-white text-black rounded-full px-2 py-1"
            >{{ store.getCart.length }}</span
          >
        </div></NuxtLink
      >
      <div></div>
    </div>
  </div>
</template>
