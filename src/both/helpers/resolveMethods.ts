import { Obj, ResolveMethods } from '@both/types/types'

export function resolveMethods<T extends Obj>(obj: T): ResolveMethods<T> {
    const resolvedObj = {} as ResolveMethods<T>
    for (const k in obj) {
        const val = obj[k]
        resolvedObj[k] = typeof val === 'function' ? val() : val
    }
    return resolvedObj
}
