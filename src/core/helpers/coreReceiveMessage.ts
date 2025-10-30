async function coreReceiveMessage(event: MessageEvent): Promise<void> {
    if (!isMessage(event.data)) return

    const { messageId, isRequest, secretId, funcName, funcArgs, result, isError } = event.data

    if (isRequest) {
        let task: Task | undefined = tasks.find((task) => task.secretId === secretId)
        if (task === undefined) return
        if (funcName === undefined) return

        let isError: boolean
        let result: unknown

        const func = task[funcName as keyof Task] as Function | undefined
        if (isFunction(func)) {
            try {
                result = await func.apply(task, funcArgs)
                isError = false
            } catch (error) {
                result = error
                isError = true
            }
        } else {
            result = Error(`Không tìm thấy hàm "${funcName}"`)
            isError = true
        }
        coreSend(task, {
            messageId,
            isRequest: false,
            isError,
            result
        })
    } else {
        const resolver = find(messenger.resolvers, { messageId })
        if (resolver === undefined) return

        if (isError) {
            resolver.reject(result)
        } else {
            resolver.resolve(result)
        }
        remove(messenger.resolvers, { messageId })
    }
}
