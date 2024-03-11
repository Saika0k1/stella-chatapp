<template>
    <div class="hover:bg-opacity-10 bg-slate-700 bg-opacity-0 p-4 duration-100">
        <strong>{{ from }}</strong>
        <p>{{ msg }}</p>
    </div>
</template>

<script setup>
    defineProps([
        'from',
        'msg'
    ])
</script>

<style>

</style>