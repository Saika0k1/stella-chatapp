<template>
  <div class="w-full pt-48">
    <form 
    @submit.prevent="handleSubmit"
    autocomplete="off"
    class="m-auto flex flex-col w-72 gap-y-4">
        <div class="space-y-1">
            <p class="font-semibold text-blue-700">Email</p>
            <input
            required
            v-model="form.username"
            type="text"
            name="username"
            placeholder="example@email.com">
        </div>
        <div class="space-y-1">
            <p class="font-semibold text-blue-700">Password</p>
            <input
            required
            v-model="form.password"
            type="password"
            name="password">
        </div>
        <div class="flex flex-col gap-y-2 items-end">
            <p class="text-sm">Don't have an account? <NuxtLink to="/register" class="text-blue-400">Register here.</NuxtLink></p>
            <ButtonSubmit label="Login" />
        </div>
    </form>
  </div>
</template>

<script setup>
    // redirect to index page if already logged in
    if (process.client && localStorage.getItem('authToken') !== null) {
        await navigateTo('/')
    }

    const form = reactive({
        username: "",
        password: ""
    })

    async function handleSubmit() {
        const { data: res } = await useAsyncData(() => $fetch('http://localhost:5001/auth/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: {
                'username': form.username,
                'password': form.password 
            }
        }))

        storeToken(res.value.access_token)
        await navigateTo('/')
    }

    function storeToken(token) {
        if(process.client) {
            localStorage.setItem('authToken', token)
        }
    }

</script>