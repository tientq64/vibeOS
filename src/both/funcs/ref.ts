import { isPrimitive } from '@both/funcs/isPrimitive'
import { ref as valtioRef } from 'valtio'

export function ref(obj: any) {
    if (isPrimitive(obj)) {
        return obj
    }
    return valtioRef(obj)
}
