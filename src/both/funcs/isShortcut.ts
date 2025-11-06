import { Shortcut } from '@both/constants/shortcuts'
import { isObject } from '@both/funcs/isObject'
import { isString } from '@both/funcs/isString'

export function isShortcut(val: unknown): val is Shortcut {
    return isObject(val) && isString(val.targetPath)
}
