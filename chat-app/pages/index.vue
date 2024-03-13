<template>
    <div class="w-full h-full flex">
        <Sidebar />
        <div class="w-full flex-1 h-full bg-primary">
            <main class="w-full h-full">
                <div class="mx-auto w-full h-full">
                    <ChatBox />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
    // redirect to login page if not logged in
    if (process.client && localStorage.getItem('authToken') === null) {
        await navigateTo('/login')
    }
</script>