<script lang="ts" setup>
const { data } = useAuth();
const user = data.value?.user;
if (!user) {
  navigateTo("/sign-in");
}
const isLoading = ref(false);

definePageMeta({
  middleware: "auth",
});

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
  isLoading.value = false;
  await navigateTo("/");
};
</script>

<template>
  <div v-if="user" class="flex md:w-4/6 w-full mx-auto h-screen mt-10">
    <sidebar />
    <div class="md:ml-20 ml-4 md:max-w-full max-w-76 mr-4">
      <h1>Your Settings</h1>
      <div class="space-y-2 mt-4 flex flex-col">
        <label>Zipcode</label>
        <input
          placeholder="Your zipcode"
          v-model="zipcodeInput"
          type="text"
          class="py-1.5 px-4 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
      </div>
      <div class="space-y-2 mt-4 flex flex-col">
        <label>Street + housenumber</label>
        <div class="flex gap-2">
          <input
            placeholder="Your street"
            v-model="streetInput"
            type="text"
            class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
          />
          <input
            placeholder="Nr."
            v-model="numberInput"
            type="text"
            class="py-1.5 px-4 w-10 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
          />
        </div>
      </div>

      <div class="space-y-2 mt-4 flex flex-col">
        <label>Country</label>
        <input
          placeholder="Your country"
          v-model="countryInput"
          type="text"
          class="py-1.5 px-4 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
      </div>
      <button
        :disabled="isLoading"
        class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        @click="createUser"
      >
        {{ isLoading ? "Saving.." : "Save" }}
      </button>
    </div>
  </div>
</template>
