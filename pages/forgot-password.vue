<script lang="ts" setup>
const { status, data, signIn, signOut } = useAuth();

const email = ref();
const password = ref();
const name = ref();

const handleRestorePassword = async () => {
  // handle the logic here
};

if (data.value?.user?.email) {
  navigateTo("/account/settings");
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="px-16 py-20 flex flex-col border-groove border-black border-0.5 rounded-sm"
    >
      <span class="font-bold font-melodrama text-xl"
        >Forgot your password?</span
      >

      <form
        @submit.prevent="handleRestorePassword"
        class="flex flex-col gap-2 mt-2"
      >
        Please write you email so we can send a link to restore your password.
        <label>Email:</label>
        <input
          v-model="email"
          placeholder="Your email"
          type="text"
          class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />

        <button
          type="submit"
          class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        >
          Restore
        </button>
      </form>
    </div>
  </div>
</template>
