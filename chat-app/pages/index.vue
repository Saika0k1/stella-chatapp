<template>
    <div class="w-full h-full flex">
        <Sidebar @get-workspace="connectToWorkspace" />
        <div class="w-full flex-1 h-full bg-primary">
            <header class="top-0 fixed w-full h-16 border-b border-lighter flex">
                <h1 class="h-full flex flex-row items-center text-2xl gap-3 ml-6">
                    <strong v-if="!workspace">Select a Workspace</strong>
                    <strong v-else>{{ workspace.name }}</strong>
                </h1>
            </header>
            <main class="w-full h-full">
                <div class="mx-auto w-full h-full">
                    <ChatBox :workspaceSeleted="workspace.id" :chatSelected="chatId" :chatHistory="chatHistory" @send-message="sendMessage"/>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    async setup() {
        const authToken = ref('')
        const workspace = ref('')
        const chatId = ref(null)
    
        // redirect to login page if not logged in
        if (process.client && localStorage.getItem('authToken') === null) {
            await navigateTo('/login')
        }

        return {
            authToken,
            workspace, 
            chatId
        }
    },
    data() {
        return {
            waitingForResponse: false,
            chatHistory: [],
            socket: {},
            letter: {
                message: '',
                chat_id: '',
                message_string: ''
            },
        }
    }, 
    computed: {
        async connectionString() {
            return await this.getConnetionString(this.chatId)
        }
    },
    methods: {
        connectToIo: async function() {
            if (process.client) {
                this.socket = this.$nuxtSocket({
                    name: 'main',
                    channel: '/chat',
                    query: {
                        'chat_id': this.chatId,
                        'connection_string': await this.connectionString
                    }
                })
                
                this.socket.on('connect', () => {
                    this.connected = true
                    console.log('connected')
                })

                this.socket.on('message', (msg) => {
                    this.chatHistory.push({'from': 'STELLA', 'message': msg})
                    this.waitingForResponse = true
                    console.log(this.chatHistory)
                })  
            }
        },
        connectToWorkspace: async function(value) {
            this.workspace = value
            // console.log(workspace.value)
    
            const { data: chats, pending: waitChats } = await useFetch(`http://localhost:5001/workspace/${this.workspace.id}/chats`, {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                },
                server: false
            })

            this.chatId = chats.value.chats[0]

            this.connectToIo()
            // console.log(this.chatId)
        },
        getConnetionString: async function(id) {
            const { data: auth, pending } = await useFetch('http://localhost:5001/chat/authorize', {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                },
                server: false,
                params: {
                    'chat_id': this.chatId
                }
            })

            // console.log(auth.value.string)

            return auth.value.string
        },
        sendMessage: async function(message) {
            console.log(message)
            const { data: string } = await useFetch('http://localhost:5001/chat/authorize/message', {
                headers: {
                    'Authorization': `Bearer ${this.authToken}`
                },
                server: false,
                params: {
                    'chat_id': this.chatId
                }
            })
            
            this.letter.message = message
            this.letter.chat_id = this.chatId
            this.letter.message_string = string.value.string

            console.log(this.letter)

            this.socket.emit('chat_message', JSON.stringify(this.letter))
            this.chatHistory.push({'from': 'You', 'message': this.letter.message})
        }
    }
}
</script>
