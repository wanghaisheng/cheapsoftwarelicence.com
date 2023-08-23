<script lang="ts" setup>
const errmsg = ref();

definePageMeta({
  middleware: "signedin",
});

const code = ref();
const password = ref();
const route = useRoute();
const email = route.query.email;
const codequery = route.query.code;

onMounted(() => {
  code.value = codequery;
});

const handleConfirmEmail = async () => {
  try {
    await $fetch("/api/confirmEmail", {
      method: "POST",
      body: {
        code: code.value,
        email: email,
        password: password.value,
      },
    });
    errmsg.value = "";
    navigateTo("/");
  } catch (err) {
    errmsg.value = err;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="px-16 py-20 flex flex-col border-groove border-black border-0.5 rounded-sm"
    >
      <span class="font-bold font-melodrama text-xl">Confirm your email</span>

      <form
        @submit.prevent="handleConfirmEmail"
        autocomplete="off"
        class="flex flex-col gap-2 mt-2"
      >
        Please enter the 4 digit code.
        <label for="code">Code:</label>
        <input
          name="code"
          id="code"
          required
          v-model="code"
          placeholder="...."
          type="text"
          class="py-1.5 px-4 w-10 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
        <label for="password">Password:</label>
        <input
          name="password"
          id="password"
          required
          v-model="password"
          placeholder="Enter your password"
          type="password"
          class="py-1.5 px-4 w-40 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
        <span class="w-60 text-red-500 text-sm" v-if="errmsg">{{
          errmsg
        }}</span>
        <button
          type="submit"
          class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        >
          Enter code
        </button>
      </form>
    </div>
  </div>
</template>
