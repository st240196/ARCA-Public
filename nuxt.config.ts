import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  components: true,
  spaLoadingTemplate: "./loading.html",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/style.css"],

  app: {
    baseURL: "/",
    keepalive: true,
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "https://arca-project.240196.workers.dev/api/v1"
    }
  },
  nitro: {
    preset: "static"
  }
});
