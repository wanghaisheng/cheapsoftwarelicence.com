<script lang="ts" setup>
const { status, data, signIn, signOut } = useAuth();

const email = ref();
const password = ref();
const isLoading = ref(false);
const isFalseCredentials = ref(false);

definePageMeta({
  middleware: "signedin",
});

const handleSignInGoogle = async () => {
  await signIn("google");
};

const handleSigninCredentials = async () => {
  isLoading.value = true;
  if (!password.value || !email.value) {
    isFalseCredentials.value = true;
    setTimeout(() => {
      isFalseCredentials.value = false;
    }, 3000);
  }
  const { data } = await useFetch("/api/checkUserCredentials", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });
  if (!data?.value?.data) {
    isLoading.value = false;
    isFalseCredentials.value = true;
    setTimeout(() => {
      isFalseCredentials.value = false;
    }, 4000);
    console.log("the user does password did not match, or does not exist");
  } else {
    console.log("the user does password did match");
    await signIn("credentials", {
      email: email.value,
      password: password.value,
    });
    navigateTo("/");
    isLoading.value = false;
  }
};

if (data.value?.user?.email) {
  navigateTo("/");
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="px-16 py-20 flex flex-col border-groove border-black border-0.5 rounded-sm"
    >
      <span class="font-bold font-melodrama text-xl">Sign in to continue</span>

      <div class="mt-4">
        <button
          @click="() => handleSignInGoogle()"
          type="button"
          class="w-full cursor-pointer text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            class="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fill-rule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clip-rule="evenodd"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
      <form
        @submit.prevent="handleSigninCredentials"
        autosave="on"
        autocomplete="on"
        class="flex flex-col gap-2 mt-2"
      >
        <label>Email:</label>
        <input
          required
          v-model="email"
          placeholder="Your email"
          type="text"
          class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
        <label>Password:</label>
        <input
          required
          v-model="password"
          placeholder="Your password"
          type="password"
          class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
        <span class="text-red-500" v-if="isFalseCredentials"
          >Incorrect credentials</span
        >
        <NuxtLink class="text-sm mt-4" to="/sign-up"
          >I don't have an account.</NuxtLink
        >
        <NuxtLink class="text-sm" to="/forgot-password"
          >Forgot my password?</NuxtLink
        >
        <button
          :disabled="isLoading"
          type="submit"
          class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        >
          {{ isLoading ? "Signing in.." : "Sign in" }}
        </button>
      </form>
    </div>
  </div>
</template>
