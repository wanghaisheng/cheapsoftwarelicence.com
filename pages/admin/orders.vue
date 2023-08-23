<script lang="ts" setup>
import dayJs from "dayjs";

const { data } = useAuth();
const user = data.value?.user;
const isSend = ref();
const softwarekey = ref();
const orderId = ref();
const emailCustomer = ref();

if (!user) {
  navigateTo("/sign-in");
}

const isPayd = ref(false);
const route = useRoute();

isPayd.value = route.query.success === "true";

const payments = await $fetch("/api/get-all-orders");

const sendEmail = async () => {
  await $fetch("/api/send-product-code", {
    method: "POST",
    body: {
      order: orderId.value,
      code: softwarekey.value,
      emailCustomer: emailCustomer.value,
    },
  });
  reloadNuxtApp();
};
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
              <th scope="col" class="px-6 py-3">Id</th>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="i"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="(payment, i) in payments"
            >
              <th v-if="payment.success_url?.includes('cheapsoftwarelicence')">
                <span class="">
                  {{ payment.id }}
                </span>
              </th>
              <th v-if="payment.success_url?.includes('cheapsoftwarelicence')">
                <span class="">
                  {{ payment.customer_email }}
                </span>
              </th>
              <th>
                <span class="font-medium">
                  {{ dayJs(payment.created * 1000).format("DD-MM-YYYY HH:mm") }}
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-10 flex flex-col gap-4">
        <label>OrderId</label>
        <input required class="w-60 py-1" type="text" v-model="orderId" />
        <label>Email</label>
        <input required class="w-60 py-1" type="text" v-model="emailCustomer" />
        <label>Key</label>
        <input required class="w-60 py-1" type="text" v-model="softwarekey" />
        <span
          @click="() => sendEmail()"
          class="cursor-pointer underline font-medium mr-2 px-2.5 py-0.5 rounded"
        >
          Send code
        </span>
      </div>
    </div>
  </div>
</template>
