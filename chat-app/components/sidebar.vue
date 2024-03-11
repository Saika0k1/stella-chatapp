<template>
    <div class="h-full w-72 bg-red-300 flex flex-col p-8 justify-between">
        <div class="flex flex-col">
            <div class="mb-4">
                <h1 class="text-4xl font-black">STELLA</h1>
            </div>
            <div class="flex flex-col">
                workspace
            </div>
        </div>
        <div class="flex items-end">
            <button @click="logOut">Logout</button>
        </div>
    </div>
</template>

<script setup>
    async function logOut(){
        if (!process.client) {
            return
        }

        localStorage.removeItem('authToken')
        await navigateTo('/login')
    }
</script>