import { find } from '@both/funcs/find'
import { isFunction } from '@both/funcs/isFunction'
import { removeBy } from '@both/funcs/removeBy'
import { isMessage } from '@both/helpers/isMessage'
import { Task, tasks } from '@both/states/tasks'

export async function coreReceiveMessage(event: MessageEvent): Promise<void> {
    if (!isMessage(event.data)) return

    const { messageId, isRequest, secretId, funcName, funcArgs, result, isError } = event.data

    let task: Task | undefined = tasks.find((task2) => {
        return task2.messenger.secretId === secretId
    })
    if (task === undefined) return

    if (isRequest) {
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
        task.send({
            messageId,
            isRequest: false,
            isError,
            result
        })
    } else {
        const resolver = find(task.messenger.resolvers, { messageId })
        if (resolver === undefined) return

        if (isError) {
            resolver.reject(result)
        } else {
            resolver.resolve(result)
        }
        removeBy(task.messenger.resolvers, { messageId })
    }
}
