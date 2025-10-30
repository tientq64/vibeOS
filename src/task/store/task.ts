interface TS extends Both, TaskFuncs, OSFuncs {}

const ts = proxy<TS>({
    ...both,
    ...(Object.fromEntries(
        osFuncNames.map((funcName) => {
            return [
                funcName,
                function <T>(...funcArgs: unknown[]): Promise<T | undefined> {
                    return taskSend({
                        messageId: uniqId(),
                        isRequest: true,
                        secretId,
                        funcName,
                        funcArgs
                    })
                }
            ]
        })
    ) as any)
})
