import { isFunction } from '@both/funcs/isFunction'

export function safeCall(func: unknown, ...args: unknown[]) {
    if (!isFunction(func)) return

    try {
        return func.apply(null, args)
    } catch (error) {
        console.error(error)
    }
}
