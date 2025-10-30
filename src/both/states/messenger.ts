type Message = {
    messageId: string
    isRequest: boolean
    secretId?: string
    funcName?: string
    funcArgs?: unknown[]
    result?: unknown
    isError?: boolean
}

interface Resolver {
    messageId: string
    resolve: Function
    reject: Function
}

interface Messenger {
    resolvers: Resolver[]
}

const messenger: Messenger = ref({
    resolvers: []
})
