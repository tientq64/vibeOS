interface FrameTask {
    args: Obj
}

const frame: FrameTask = {
    args
}

interface TS extends Both, TaskFuncs, OSFuncs, FrameTask {}

const ts = proxy<TS>({
    ...both,
    ...frame,
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
