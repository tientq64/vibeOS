function coreSend<T>(task: Task, message: Message): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        if (!task.postMessage) {
            resolve(undefined)
            return
        }

        let resolver: Resolver = {
            messageId: message.messageId,
            resolve,
            reject
        }
        messenger.resolvers.push(resolver)

        task.postMessage(message, '*')
    })
}
