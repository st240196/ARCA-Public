// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: "./loading.html",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/style.css"],
  app: {
    baseURL: "/"
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:3001/api/v1"
    }
  }
});
