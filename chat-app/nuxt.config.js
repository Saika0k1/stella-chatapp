// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-socket-io",
    "@nuxtjs/google-fonts"
  ],
  io: {
    sockets: [{
      name: 'main',
      url: 'http://localhost:3000/'
    }]
    // server: {
    //   /* CORS options */ 
    //   cors: { 
    //     origin: "*"
    //   }
    // }
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