import { Obj } from '@both/types/types'

export function isObject(val: unknown): val is Obj {
    return val !== null && typeof val === 'object'
}
