// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      gtagId: "G-RKPW1NE4M2",
    }
  },
  modules: [
    "@unocss/nuxt",
    "@pinia/nuxt",
     "@nuxt/image",
    
  ],
  routeRules: {
    "/": { isr: true },
    "/trending": { isr: true },
    "/collections/office": { isr: true },
    "/details/Adobe%20Creative%20Cloud%20Entire%20Collection%20of%20Adobe%20Creative%20Tools%20Plus%20100G%20Storage%2012Month%20subscription%20with%20Auto%20Renewal%20PC%20Mac?id=7": {isr: true},
    "/details/Windows%2011%20Pro%20Cd%20Key%20Retail%20Microsoft%20Global?id=10": {isr: true},
    "/details/Microsoft%20Office%20Professional%20Plus%202021?id=5": {isr: true},
    "/details/Microsoft%20Office%202019%20Professional%20Plus%20Cd%20Key%20Phone%20Activation?id=11": {isr: true},
    "/details/Windows%2011%20Home%20Cd%20Key%20OEM%20Microsoft%20Global?id=8": {isr: true},
    "/cart": { ssr: false },
    "/shipping": { ssr: false },
  },
  components: {
    dirs: ["~/components"],
    global: true,
  }
});
