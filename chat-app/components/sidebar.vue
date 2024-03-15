<template>
    <div class="h-full w-72 bg-primary flex flex-col p-2 justify-between border-r-lighter border-r overflow-clip">
        <div class="flex flex-col p-4">
            <div class="mb-4">
                <h1 class="text-4xl font-black">STELLA</h1>
            </div>
            <div class="flex flex-col flex-1">
                <div aria-disabled class="hover:cursor-not-allowed hover:opacity-100">
                    <p class="opacity-50">+ Add a new workspace</p>
                </div>
                <div class="pt-8">
                    <div v-if="pending">
                    Loading...
                    </div>
                    <div v-else class="flex flex-col gap-y-8">
                        <div class="flex flex-row gap-2" v-for="value in workspaces.workspaces" :key="value.id">
                            <div class="w-full" v-if="editMode != value.id">
                                <div :class="`flex flex-row justify-between w-full p-2 hover:bg-lighter active:bg-lightest hover:cursor-pointer rounded-lg ${selectedWorkspace.id == value.id ? 'bg-lighter': 'bg-primary'}`">
                                    <strong :key="rerenderKey" class="w-full" @click="selectWorkspace(value)">{{ value.name }}</strong>
                                    <div @click="popupMenu(value.id)" class="hover:cursor-pointer">
                                        <span class="flex flex-col justify-center mt-0.5">
                                            <nuxt-icon name="more_vert" class="text-xl"/>
                                        </span>
                                    </div>
                                    <SidebarWorkspaceOptions :renameWorkspace="editWorkspace" v-if="openContext == value.id" v-on-click-outside="closeContext" ref="contextRef" class="absolute bg-primary left-64 ml-4 border-lighter border" :id="value.id"/>
                                </div>
                            </div>
                            <div class="" v-else>
                                <div class="flex flex-row justify-between">
                                    <input type="text" v-model="newName">
                                    <div @click="popupMenu(value.id)" class="*:hover:cursor-pointer flex flex-row gap-2 ml-2">
                                        <span @click="confirmEdit" class="flex flex-col justify-center mt-0.5 w-5">
                                            <nuxt-icon name="done" class="text-xl text-green-500"/>
                                        </span>
                                        <span @click="cancelEdit" class="flex flex-col justify-center mt-0.5 w-5">
                                            <nuxt-icon name="close" class="text-xl text-red-500"/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-end pl-4">
            <ButtonSubmit @click="logOut" label="Logout" />
        </div>
    </div>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components';

const authToken = ref('')
const rerenderKey = ref(0)
const selectedWorkspace = ref(0)
const openContext = ref(0)
const editMode = ref(0)
const newName = ref('')

const emit = defineEmits([
    'get-workspace'
])

if (process.client) {
    authToken.value = localStorage.getItem('authToken')
}

const { data: workspaces, pending } = await useFetch('http://localhost:5001/workspace', {
    headers: {
        'Authorization': `Bearer ${authToken.value}`
    },
    server: false
})

if (!pending.value) {
    rerenderKey.value +=1
}

async function logOut(){
    if (process.client) {
        localStorage.removeItem('authToken')
        await navigateTo('/login')
    }
}

function popupMenu(id) {
    openContext.value = id
}

function closeContext() {
    openContext.value = 0
}

function editWorkspace() {
    editMode.value = openContext.value
}

function cancelEdit() {
    editMode.value = 0
}

function selectWorkspace(id) {
    selectedWorkspace.value = id
    emit('get-workspace', id)
}

async function confirmEdit() {
    const { data: newWorkspace } = await useFetch(`http://localhost:5001/workspace/${editMode.value}/rename`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${authToken.value}`
        },
        body: {
            'name': newName.value
        }
    });

    cancelEdit()
    newName.value = ''
    reloadNuxtApp()
}
</script>