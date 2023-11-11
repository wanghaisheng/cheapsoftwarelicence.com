import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

interface Store{
  randomId?: string,
  id?: number
}

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    cart: useLocalStorage(
      "pinia-store-cartItems-cart",
      [] as Store[]
    ) ,
  }),
  hydrate: (state) => {
    state.cart = useLocalStorage(
      "pinia-store-cartItems-cart",
      []
    ) as unknown as Store[]
  },
  getters: {
    getCart: (state) => state.cart,
  },
  actions: {
    addToCart(id: number) {
      const uuid = uuidv4()
      this.cart.push({randomId: uuid, id: id});
    },
    removeFromCart(uuid: string) {
     
      const index = this.cart.map(item => item.randomId).indexOf(uuid)
     this.cart.splice(index, 1)
    },
  },
});

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
  //@ts-ignore
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}