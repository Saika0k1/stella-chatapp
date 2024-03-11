<template>
    <button type="submit" class="bg-blue-700 font-semibold text-white ">{{ label }}</button>
</template>

<script setup>
    defineProps([
        'label'
    ])
</script>