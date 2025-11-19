import { taskFuncNames } from '@both/constants/funcNames'
import { uniqId } from '@both/funcs/uniqId'
import { Task } from '@both/states/tasks'
import type { TaskAsyncFuncs } from '@task/store/store'

export function makeTaskAsyncFuncs(): TaskAsyncFuncs {
    const entries = taskFuncNames.map((funcName) => {
        return [
            funcName,
            async function <T>(this: Task, ...funcArgs: unknown[]): Promise<T | undefined> {
                return this.send({
                    messageId: uniqId(),
                    isRequest: true,
                    secretId: undefined,
                    funcName,
                    funcArgs
                })
            }
        ]
    })
    const funcs = Object.fromEntries(entries)
    return funcs
}
