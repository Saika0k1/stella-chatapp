<template>
  <div class="bg-slate-200 w-full h-screen overflow-hidden font-space text-orange-50">
    <NuxtPage/>
  </div>
</template>

<script setup>
  useHead({
    title: "STELLA Chat App",
    meta: [
      {
        name: "A chat app integrated with STELLA. "
      }
    ]
  })
</script>

<style>
button, input[type="submit"] {
  @apply border border-blue-700 text-blue-700 max-w-20 min-w-fit px-6 py-2 rounded-full pt-1 font-semibold
}

input[type="text"], input[type="password"] {
  @apply w-full h-12 py-3 px-6 outline-none bg-lighter focus:bg-lightest rounded-full
}

a {
  @apply hover:underline
}
</style>