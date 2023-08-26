<script lang="ts" setup>
interface Props {
  productId: number;
}
const props = defineProps<Props>();
const stars = ref(5);
const review = ref("");
const isLoading = ref(false);
const { data: session, status } = useAuth();
const { data, refresh } = useFetch(
  `/api/get-reviews?productid=${props.productId}`
);

const createReview = async () => {
  isLoading.value = true;
  await $fetch("/api/create-review", {
    method: "POST",
    body: {
      productid: props.productId,
      name: session.value?.user?.name,
      stars: stars.value,
      review: review.value,
    },
  });
  isLoading.value = false;
  review.value = "";
  await refresh();
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <div
      class="border border-groove border-gray-300 border-0.5 py-2 pb-10 px-4 flex flex-col"
      v-for="review in data"
    >
      <div>
        <div class="flex">
          <div v-for="rev of Number(review.stars)">
            <div class="i-mdi-star text-xl text-yellow" />
          </div>
          <span class="text-sm">({{ review.stars }})</span>
        </div>
      </div>
      <span class="font-bold">{{ review?.name }}</span>
      <span>{{ review?.review }}</span>
    </div>
    <div v-if="status === 'authenticated'" class="mt-6">
      <span class="font-bold">Write a review!</span>
      <div class="flex items-center gap-2 mb-1">
        <label>Stars:</label>
        <select v-model="stars">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
          <option :value="5">5</option>
        </select>
      </div>
      <textarea
        v-model="review"
        class="w-full h-20 border-gray-300 rounded-xl py-2"
      ></textarea>
      <button
        :disabled="isLoading"
        class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-pointer hover:bg-gray-900"
        @click="createReview"
      >
        {{ isLoading ? "Saving.." : "Create review" }}
      </button>
    </div>
    <div v-else>
      <textarea
        :disabled="true"
        v-model="review"
        class="w-full h-20 bg-gray-100 border-gray-300 rounded-xl py-2 cursor-not-allowed"
      ></textarea>
      <button
        :disabled="true"
        class="bg-black text-white disabled:bg-gray-300 disabled:text-gray-400 py-2 px-4 border-none mt-4 cursor-not-allowed hover:bg-gray-900"
      >
        You need to sign in
      </button>
    </div>
  </div>
</template>
