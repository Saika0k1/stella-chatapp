<template>
    <form action="handleSubmitMsg" method="post">
        <div class="flex w-full p-2 gap-2">
            <input type="text" name="message" rows="1" placeholder="Message STELLA"/>
            <ButtonChat />
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            socket: {}
        }
    },
    mounted() {
        if (process.client) {
            this.socket = this.$nuxtSocket({
                name: 'main',
                channel: '/chat'
            })
    
            this.socket.on('connect', () => {
                // console.log('askhasdhas')
            })
        }
    }
}
</script>