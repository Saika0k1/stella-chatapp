// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-socket-io",
    "nuxt-icons"
  ],
  io: {
    sockets: [{
      name: 'main',
      url: 'http://localhost:5001'
    }],
    server: {
      /* CORS options */ 
      cors: { 
        origin: "*"
      }
    }
  },
  googleFonts: {
    families: {
      'Space Grotesk': '300..700'
    },
    download: true,
    base64: true,
    inject: true,
  }
})