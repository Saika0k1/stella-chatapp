<template>
    <div class="w-full h-full bg-primary pt-16">
        <div class="flex flex-col-reverse justify-between h-full">
            <ChatTextarea @user-message="parseMessage" v-if="workspaceSeleted" class="flex mt-2 w-[720px] mx-auto" />
            <div v-else class="flex mt-2 w-[720px] mx-auto" ></div>
            <div ref="scrollRef" class="flex-col flex-1 space-y-2 overflow-x-hidden overflow-y-auto">
                <div class="w-[720px] h-full mx-auto">
                    <div class="w-full h-full flex justify-center items-center" v-if="!workspaceSeleted">
                        Please select a Workspace
                    </div>
                    <div class="w-full h-full" v-else>
                        <ChatMessage v-for="(message, key) in chatHistory" :key="key" :from="message.from" :msg="message.message"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps([
    'workspaceSeleted',
    'chatSeleted',
    'chatHistory'
])

const emit = defineEmits([
    'send-message'
])

async function parseMessage(message) {
    emit('send-message', message)
}
</script>