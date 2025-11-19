import { Obj } from '@both/types/types'

export function omitUndef(obj: Obj): Obj {
    const omitedObj: Obj = {}
    for (const key in obj) {
        if (obj[key] === undefined) continue
        omitedObj[key] = obj[key]
    }
    return omitedObj
}
