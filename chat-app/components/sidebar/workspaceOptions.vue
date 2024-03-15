<template>
    <div :id="id" class="rounded-lg w-56 flex flex-col *:p-4 divide-y divide-lighter ">
        <div class="cursor-not-allowed" aria-disabled>
            <strong class="text-red-400 text-opacity-50">Delete</strong>
        </div>
        <div class="hover:cursor-pointer hover:bg-lighter rounded-b-md" @click="renameWorkspace">
            <strong>Rename</strong>
        </div>
    </div>
</template>

<script setup>
const props = defineProps([
    'id',
    'renameWorkspace'
])

const authToken = ref('')

if (process.client) {
    authToken.value = localStorage.getItem('authToken')
}

// async function deleteWorkspace() {
//     console.log('deleting')
//     const { data, pending } = await useFetch(`http://localhost:5001/workspace/${props.id}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': `Bearer ${authToken.value}`
//         }
//     })
// }
</script>

<style>

</style>