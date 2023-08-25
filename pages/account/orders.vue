<script lang="ts" setup>
import dayJs from "dayjs";

const { data } = useAuth();
const user = data.value?.user;
const isSend = ref();
const isOpen = ref(false);

if (!user?.email) {
  navigateTo("/sign-in");
}

const isPayd = ref(false);
const route = useRoute();

isPayd.value = route.query.success === "true";

const { data: payments } = await useAsyncData("getPayments", async () => {
  return await $fetch("/api/getPayments", {
    method: "POST",
  });
});

const checkReceived = async (id: string) => {
  const { data: productCode } = await useAsyncData(
    "checkProductCode",
    async () => {
      return await $fetch("/api/check-product-code", {
        method: "POST",
        body: { id: id },
      });
    }
  );
  console.log(productCode.value);
  isSend.value = productCode.value;
  isOpen.value = true;
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 z-40 h-screen flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="relative py-10 z-50 px-10 bg-white border border-groove border-gray-300"
    >
      <span
        @click="isOpen = false"
        class="absolute top-2 right-2 cursor-pointer text-xl"
        >X</span
      >
      <div class="flex flex-col">
        <span v-if="isSend">Productcode is already send.</span>
        <span v-else>Productcode is not send yet.</span>
      </div>
    </div>
  </div>
  <div v-if="user" class="flex md:w-4/6 w-full mx-auto h-screen mt-10">
    <sidebar />
    <div class="md:ml-20 ml-2">
      <h3>My orders</h3>
      <div class="relative overflow-x-auto w-full">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Order created</th>
              <th scope="col" class="px-6 py-3">Amount</th>
              <th scope="col" class="px-6 py-3">Received</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="i"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="(payment, i) in payments?.users"
            >
              <th>
                <span
                  class="bg-green-100 text-green-800 border-groove text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                >
                  {{ payment.payment_status }}
                </span>
              </th>
              <th>
                <span class="font-medium">
                  {{ dayJs(payment.created * 1000).format("DD-MM-YYYY HH:mm") }}
                </span>
              </th>

              <th>
                <span class="font-medium"
                  >€
                  {{ ((payment?.amount_total ?? 0) / 100)?.toFixed(2) }}</span
                >
              </th>
              <th>
                <span
                  @click="() => checkReceived(payment?.id)"
                  class="underline text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  Check
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
