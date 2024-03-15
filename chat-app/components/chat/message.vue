<template>
    <div class="hover:bg-opacity-10 bg-primary bg-opacity-0 p-4 duration-100">
        <strong>{{ from }}</strong>
        <p class="whitespace-pre-line">{{ msg }}</p>
    </div>
</template>

<script setup>
defineProps([
    'from',
    'msg'
])

const emit = defineEmits([
    'scroll'
])

onMounted(() => {
    emit('scroll')
})
</script>

<style>

</style>