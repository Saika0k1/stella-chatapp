<template>
  <div class="bg-slate-200 w-full h-screen overflow-hidden font-space">
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
  @apply outline-none p-1 bg-white bg-opacity-0 focus:bg-opacity-50 transition ease-linear duration-200 w-full bg-transparent border-b border-blue-700 placeholder:text-sm
}

a {
  @apply hover:underline
}
</style>