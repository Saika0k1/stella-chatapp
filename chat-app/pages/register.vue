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
        <div class="space-y-1">
            <p class="font-semibold text-blue-700">Confirm Password</p>
            <input
            required
            v-model="form.rePassword"
            type="password"
            name="rePassword">
        </div>
        <div class="flex flex-col gap-y-2 items-end">
            <div v-if="error">
                <p class="text-red-500">{{ errorMsg }}</p>
            </div>
            <p class="text-sm">Already have an account? <NuxtLink to="/login" class="text-blue-400">Login here.</NuxtLink></p>
            <ButtonSubmit label="Register" />
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
        password: "",
        rePassword: "",
    })

    const authToken = ref('')
    const error = ref(false)
    const errorMsg = ref('')

    async function handleSubmit() {
        if (form.password != form.rePassword) {
            error.value = true
            errorMsg.value = 'Passwords do not match'

            return
        }

        console.log('uh oh')
        const { data , error: err } = await useFetch('http://localhost:5001/register', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            server: false,
            body: {
                'username': form.username,
                'password': form.password 
            }
        })

        if (err.value != null && err.value.statusCode != 200) {
            error.value = true
            errorMsg.value = err.value.data.msg
            // console.log(err.value.statusCode)

            return
        }

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

        console.log('yippee')
        storeToken(res.value.access_token)
        authToken.value = localStorage.getItem('authToken')

        const { data: workspace } = await useFetch('http://localhost:5001/workspace', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken.value}`
            },
            server: false
        });
        
        const { data: chat } = await useFetch('http://localhost:5001/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken.value}`
            },
            params: {
                workspace_id: workspace.value.workspace.id
            },
            server: false
        });

        console.log(workspace.value, chat.value)
        
        await navigateTo('/')
        reloadNuxtApp()
    }

    function storeToken(token) {
        if(process.client) {
            localStorage.setItem('authToken', token)
        }
    }

</script>