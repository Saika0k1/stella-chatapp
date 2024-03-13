<template>
    <div class="h-full w-72 bg-primary flex flex-col p-8 justify-between border-r-lighter border-r">
        <div class="flex flex-col">
            <div class="mb-4">
                <h1 class="text-4xl font-black">STELLA</h1>
            </div>
            <div class="flex flex-col">
                <div @click="createWorkspace" class="hover:cursor-pointer opacity-50 hover:opacity-100">
                    <p>+ Add a new workspace</p>
                </div>
                <div class="pt-8">
                    <div v-if="pending">
                    Loading...
                    </div>
                    <div v-else class="flex flex-col gap-y-8">
                        <div class="flex flex-row justify-between" v-for="(value, key) in workspaces.workspaces" :key="key">
                            {{ value.name }}
                            <div @click="popupMenu(value.id)" class="hover:cursor-pointer">
                                <span class="flex flex-col justify-center mt-0.5">
                                    <nuxt-icon name="more_vert" class="text-xl"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-end">
            <button @click="logOut">Logout</button>
        </div>
    </div>
</template>

<script setup>
const authToken = ref('')
const rerenderKey = ref(0)
const openMenu = ref(0)

if (process.client) {
    authToken.value = localStorage.getItem('authToken')
}

const { data: workspaces, pending } = await useFetch('http://localhost:5001/workspace', {
    headers: {
        'Authorization': `Bearer ${authToken.value}`
    },
    server: false
})

async function logOut(){
    if (process.client) {
        localStorage.removeItem('authToken')
        await navigateTo('/login')
    }
}

async function createWorkspace() {
    const { data: newWorkspace } = await useAsyncData(() => $fetch('http://localhost:5001/workspace', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken.value}`
        }
    }));

    rerenderKey.value += 1
}

function popupMenu(id) {
    const workspaceId = id

    console.log(id)
}

</script>