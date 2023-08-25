<script lang="ts" setup>
const { status, data, signIn, signOut } = useAuth();

const email = ref("");
const password = ref("");
const name = ref();
const isError = ref();
const isLoading = ref(false);
const isWrongEmail = ref(false);
const openPopup = ref(false);
const confirmPassword = ref("");
const isWrongPasswordsMatch = ref(false);
const isWrongPasswordMatch = ref(false);

const handleSignInGoogle = async () => {
  await signIn("google");
};

const handleSigninCredentials = async () => {
  const isMatchPasswords = password.value === confirmPassword.value;
  const regexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const isMatchPassword = password.value.match(regexPassword);
  const regexEmail =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  const isMatchEmail = email.value.match(regexEmail);
  if (!isMatchEmail) {
    isWrongEmail.value = true;
    setTimeout(() => {
      isWrongEmail.value = false;
    }, 3000);
  } else if (!isMatchPassword) {
    isWrongPasswordMatch.value = true;
    setTimeout(() => {
      isWrongPasswordMatch.value = false;
    }, 10000);
  } else if (!isMatchPasswords) {
    isWrongPasswordsMatch.value = true;
    confirmPassword.value = "";
    setTimeout(() => {
      isWrongPasswordsMatch.value = false;
    }, 3000);
  } else {
    isLoading.value = true;
    //create the user in the database with hashed password
    await $fetch("/api/confirmEmail", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value.toLowerCase(),
        password: password.value,
      },
    });
    isLoading.value = false;
    setTimeout(() => {
      isError.value = "";
    }, 3000);

    openPopup.value = true;
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    name.value = "";
  }
};

if (status.value === "authenticated") {
  navigateTo("/");
}
</script>

<template>
  <div
    v-if="openPopup"
    class="fixed top-0 left-0 right-0 z-40 h-screen flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div
      class="relative py-16 z-50 px-16 bg-white border border-groove border-gray-300"
    >
      <span
        @click="openPopup = false"
        class="absolute top-2 right-2 cursor-pointer text-xl"
        >X</span
      >
      <div class="flex flex-col">
        <span class="font-bold"
          >Please check your inbox to confirm your email.</span
        >
      </div>
    </div>
  </div>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="px-16 py-20 flex flex-col border-groove border-black border-0.5 rounded-sm"
    >
      <span class="font-bold font-melodrama text-xl">Sign up to continue</span>

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
        class="flex flex-col gap-2 mt-2"
      >
        <label>Name:</label>
        <input
          required
          v-model="name"
          placeholder="Your name"
          type="text"
          class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
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
        <label>Confirm password:</label>
        <input
          required
          v-model="confirmPassword"
          placeholder="Your password"
          type="password"
          class="py-1.5 px-4 w-46 rounded-lg hover:border-2 hover:border-groove hover:border-sky-600 focus:border-sky-600"
        />
        <span class="w-60 text-sm text-red-500" v-if="isError"
          >User does already exists.</span
        >
        <span class="w-60 text-sm text-red-500" v-if="isWrongPasswordMatch"
          >Password must have minimum eight characters, at least one upper case
          English letter, one lower case English letter, one number and one
          special character</span
        >
        <span class="w-60 text-sm text-red-500" v-if="isWrongPasswordsMatch"
          >Passwords do not match.</span
        >
        <span class="text-red-500" v-if="isWrongEmail"
          >Email is not correct</span
        >

        <button
          :disabled="isLoading"
          type="submit"
          class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        >
          {{ isLoading ? "Signing up.." : "Sign up" }}
        </button>
      </form>
    </div>
  </div>
</template>
