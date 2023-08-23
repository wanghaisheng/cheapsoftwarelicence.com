// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@unocss/nuxt",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  routeRules: {
    "/": { isr: true },
    "/trending": { isr: true },
    "/collections/office": { isr: true },
    "/details/**": { isr: true },
    "/cart": { ssr: false },
    "/shipping": { ssr: false },
  },
  components: {
    dirs: ["~/components"],
    global: true,
  },
  auth: {
    isEnabled: true,
    baseURL: "/api/auth",
  },
});
