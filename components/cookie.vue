<script lang="ts" setup>
const cookie = useCookie("acceptcookie");

const openPopup = ref(true);

if (cookie.value === "Declined" || cookie.value === "Accepted") {
  openPopup.value = false;
} else {
  openPopup.value = true;
}

const acceptCookies = () => {
  cookie.value = "Accepted";
  openPopup.value = false;
  // window.location.reload()
};
const declineCookies = () => {
  cookie.value = "Declined";
  openPopup.value = false;
  // window.location.reload()
};
</script>

<template>
  <div
    v-if="openPopup"
    class="fixed md:bottom-4 bottom-8 left-0 z-[60] sm:max-w-sm md:p-4 p-1 mx-auto"
  >
    <div
      class="p-4 bg-gradient-to-br from-white border border-groove border-black to-white text-black rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <p class="mt-2 text-sm text-black">
        This website uses cookies to enhance your browsing experience.
      </p>
      <NuxtLink
        class="mt-3 inline-flex justify-center items-center gap-2 font-semibold text-black hover:text-black text-sm"
        to="/provacy-policy"
      >
        Learn more
        <svg
          class="w-2.5 h-2.5"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </NuxtLink>
      <div class="mt-5 flex justify-between gap-x-2">
        <button
          @click="acceptCookies"
          type="button"
          class="py-[.4125rem] text-black px-3 inline-flex justify-center items-center gap-2 rounded-full border-2 font-semibold text-white hover:text-gray-800 hover:bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm"
        >
          Accept all
        </button>
        <button
          @click="declineCookies"
          type="button"
          class="py-[.4125rem] text-black px-3 inline-flex justify-center items-center gap-2 rounded-full border-2 font-semibold text-white hover:text-gray-800 hover:bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm"
        >
          Reject all
        </button>
      </div>
    </div>
  </div>
</template>
