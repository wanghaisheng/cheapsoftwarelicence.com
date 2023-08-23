<script lang="ts" setup>
import { useCartStore } from "../stores/cart-store";
const store = useCartStore();
const cartItems: Ref<number[]> = ref([]);
const total = ref(500);
const totalShippingCosts = ref(4.5);
const totalToPay = ref(0);

cartItems.value.push(...store.cart);

const {
  data: cartItemsAll,
  pending,
  error,
  refresh,
} = await useAsyncData("getProducts", () =>
  $fetch("/api/getCartItems", {
    method: "POST",
    body: {
      cartItems: cartItems.value,
    },
  })
);

const allPrices = cartItemsAll.value?.data.map((item) => {
  return item[0].price;
});

total.value = allPrices?.reduce((a: number, b: number) => a + b, 0);

totalToPay.value = total.value + totalShippingCosts.value;

const email = ref();
const { data } = useAuth();
const user = data.value?.user;

if (!user) {
  navigateTo("/sign-in");
}
if (cartItems.value.length === 0) {
  navigateTo("/");
}

const createPaymentGeneratedContent = async () => {
  const { data: link } = await useAsyncData("createPayment", async () => {
    return await $fetch("/api/createPayment", {
      method: "POST",
      body: {
        email: user?.email,
        allitems: cartItems.value,
      },
    });
  });
  window.location.replace(link?.value?.data!);
};

const isLoading = ref(false);
const { data: userData } = await useAsyncData("getUser", () =>
  $fetch("/api/getUser", {
    method: "POST",
    body: {
      name: user?.name,
      email: user?.email,
    },
  })
);

const zipcodeInput = ref("");
const countryInput = ref("");
const numberInput = ref("");
const streetInput = ref("");

onMounted(() => {
  if (userData) {
    zipcodeInput.value = userData.value?.data[0].zipcode!;
    countryInput.value = userData.value?.data[0].country!;
    numberInput.value = userData.value?.data[0].number!;
    streetInput.value = userData.value?.data[0].street!;
  }
});

const createUser = async () => {
  isLoading.value = true;
  await useAsyncData("updateUser", () =>
    $fetch("/api/updateUser", {
      method: "POST",
      body: {
        email: user?.email,
        zipcode: zipcodeInput.value,
        street: streetInput.value,
        number: numberInput.value,
        country: countryInput.value,
      },
    })
  );
  await createPaymentGeneratedContent();

  isLoading.value = false;
};
</script>
<template>
  <form
    @submit.prevent="createUser"
    class="w-screen min-h-screen flex flex-col items-center justify-center"
  >
    <h1>Shipping</h1>
    <span class="text-gray-600 px-6"
      >Please check your credentials carefully before you continue.</span
    >
    <div class="md:w-3/12 w-5/6 mt-20">
      <div class="flex flex-col gap-2">
        <label>Name:</label>
        <span>{{ user?.name }}</span>
        <label>Email:</label>
        <span>{{ user?.email }}</span>
      </div>
      <div class="space-y-2 mt-4 flex flex-col">
        <label>Zipcode:</label>
        <input
          required
          placeholder="Your zipcode"
          v-model="zipcodeInput"
          type="text"
          class="py-1.5 px-4 rounded-md hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
      </div>
      <div class="space-y-2 mt-4 flex flex-col">
        <label>Street + housenumber:</label>
        <div class="flex gap-2 w-full">
          <input
            required
            placeholder="Your street"
            v-model="streetInput"
            type="text"
            class="py-1.5 px-4 rounded-md hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
          />
          <input
            required
            placeholder="Your housenumber"
            v-model="numberInput"
            type="text"
            class="py-1.5 px-4 w-10 rounded-md hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
          />
        </div>
      </div>

      <div class="space-y-2 mt-4 flex flex-col">
        <label>Country</label>
        <input
          required
          placeholder="Your country"
          v-model="countryInput"
          type="text"
          class="py-1.5 px-4 rounded-md hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
      </div>
      <button
        :disabled="isLoading"
        class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        type="submit"
      >
        {{ isLoading ? "Loading.." : "Continue payment" }}
      </button>
    </div>
  </form>
</template>
