import { isObject } from '@both/funcs/isObject'
import { isString } from '@both/funcs/isString'
import { Message } from '@both/states/messenger'

export function isMessage(val: unknown): val is Message {
    if (!isObject(val)) return false
    if (!isString(val.messageId)) return false
    return true
}
