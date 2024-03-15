<template>
    <div class="flex p-2 gap-2">
        <input autocomplete="off" type="text" name="message" rows="1" placeholder="Message STELLA" v-model="message"/>
        <ButtonChat @click="submitChat"/>
    </div>
</template>

<script setup>
const message = ref('')

const emit = defineEmits([
    'user-message'
])

async function submitChat() {
    console.log(message.value)

    emit('user-message', message.value)

    message.value = ''
}
</script>