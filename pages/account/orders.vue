<script lang="ts" setup>
import dayJs from "dayjs";
const { data } = useAuth();
const user = data.value?.user;

if (!user) {
  navigateTo("/sign-in");
}

definePageMeta({
  middleware: "auth",
});

const email = ref(data.value?.user?.email);
const referenceId = ref(`${data.value?.user?.email}${data.value?.user?.name}`);
const isPayd = ref(false);
const route = useRoute();

isPayd.value = route.query.success === "true";

const { data: payments } = await useAsyncData("getPayments", async () => {
  return await $fetch("/api/getPayments", {
    method: "POST",
    body: { email: email.value },
  });
});
</script>

<template>
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
              <th scope="col" class="px-6 py-3">Order id</th>
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
                  >€ {{ ((payment?.amount_total ?? 0) / 100).toFixed(2) }}</span
                >
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <NuxtLink :href="`/orders/${payment.id}`">
                  Check details
                </NuxtLink>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
