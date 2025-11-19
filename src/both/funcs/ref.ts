import { isPrimitive } from '@both/funcs/isPrimitive'
import { ref as valtioRef } from 'valtio'

export function ref<T = unknown>(obj: T): T {
    if (isPrimitive(obj)) {
        return obj
    }
    return valtioRef<any>(obj)
}
