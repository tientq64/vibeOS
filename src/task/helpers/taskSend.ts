function taskSend<T>(message: Message): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        let resolver: Resolver = {
            messageId: message.messageId,
            resolve,
            reject
        }
        messenger.resolvers.push(resolver)

        postMessageFunc(message, '*')
    })
}
