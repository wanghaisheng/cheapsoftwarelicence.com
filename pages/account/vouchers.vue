<script lang="ts" setup>
const { data } = useAuth();
const user = data.value?.user;
const voucherInput = ref("");
const correctVoucher = "DADDY10";
const isCorrectVoucher = ref("unknown");
const isLoading = ref(false);
if (!user) {
  navigateTo("/");
}

definePageMeta({
  middleware: "auth",
});

const checkVoucher = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    if (voucherInput.value === correctVoucher) {
      isCorrectVoucher.value = "correct";
    } else {
      isCorrectVoucher.value = "incorrect";
      setTimeout(() => {
        isCorrectVoucher.value = "unknown";
      }, 3000);
    }
  }, 1000);
};

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
  <div v-if="user" class="flex md:w-4/6 w-full mx-auto h-screen mt-10">
    <sidebar />
    <form @submit.prevent="checkVoucher" class="md:ml-20 ml-2">
      <h1>Vouchers & credits</h1>
      <div class="space-y-2 mt-4 flex flex-col">
        <label>Voucher-code</label>
        <span v-if="isCorrectVoucher === 'incorrect'" class="text-red-400">
          Your code was incorrect.
        </span>
        <span v-if="isCorrectVoucher === 'correct'" class="text-purple-400">
          Well done, you've actived the discount for 24 hours.
        </span>
        <input
          required
          placeholder="Your code"
          v-model="voucherInput"
          type="text"
          class="py-1.5 px-4 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />

        <button
          :disabled="isLoading"
          class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
          type="submit"
        >
          {{ isLoading ? "Checking" : "Check" }}
        </button>
      </div>
    </form>
  </div>
</template>
