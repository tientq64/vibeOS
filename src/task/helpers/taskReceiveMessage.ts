import { find } from '@both/funcs/find'
import { isFunction } from '@both/funcs/isFunction'
import { removeBy } from '@both/funcs/removeBy'
import { isMessage } from '@both/helpers/isMessage'
import { ts, TS } from '@task/store/ts'

export async function taskReceiveMessage(event: MessageEvent): Promise<void> {
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
        ts.send({
            messageId,
            isRequest: false,
            secretId: ts.messenger.secretId,
            isError,
            result
        })
    } else {
        const resolver = find(ts.messenger.resolvers, { messageId })
        if (resolver === undefined) return

        if (isError) {
            resolver.reject(result)
        } else {
            resolver.resolve(result)
        }
        removeBy(ts.messenger.resolvers, { messageId })
    }
}
