import { Message, messenger, Resolver } from '@both/states/messenger'
import { secret } from '@task/constants/secret'

export function taskSend<T>(message: Message): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        let resolver: Resolver = {
            messageId: message.messageId,
            resolve,
            reject
        }
        messenger.resolvers.push(resolver)

        secret.postMessage(message, '*')
    })
}
