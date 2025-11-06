import { ref } from '@both/funcs/ref'

export type Message = {
    messageId: string
    isRequest: boolean
    secretId?: string
    funcName?: string
    funcArgs?: unknown[]
    result?: unknown
    isError?: boolean
}

export interface Resolver {
    messageId: string
    resolve: Function
    reject: Function
}

export interface Messenger {
    resolvers: Resolver[]
}

export const messenger: Messenger = ref({
    resolvers: []
})
