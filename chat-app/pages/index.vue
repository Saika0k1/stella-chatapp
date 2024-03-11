<template>
    <div class="w-full h-full flex">
        <Sidebar />
        <div class="w-full flex-1 h-full bg-red-600">
            <main class="w-full h-full">
                <div class="mx-auto w-[720px] h-full">
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