async function taskReceiveMessage(event: MessageEvent): Promise<void> {
    if (!isMessage(event.data)) return

    const { messageId, isRequest, funcName, funcArgs, result, isError } = event.data

    if (isRequest) {
        if (funcName === undefined) return

        let isError: boolean
        let result: unknown

        const func = ts[funcName as keyof TS] as Function | undefined
        if (isFunction(func)) {
            try {
                result = await func.apply(ts, funcArgs)
                isError = false
            } catch (error) {
                result = error
                isError = true
            }
        } else {
            result = Error(`Không tìm thấy hàm "${funcName}"`)
            isError = true
        }
        taskSend({
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
