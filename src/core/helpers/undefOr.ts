import { isArray } from '@both/funcs/isArray'
import { isObject } from '@both/funcs/isObject'
import { Obj } from '@both/types/types'

export function undefOr(type: 'string', val: unknown): string | undefined
export function undefOr(type: 'float', val: unknown): number | undefined
export function undefOr(type: 'int', val: unknown): number | undefined
export function undefOr(type: 'uint', val: unknown): number | undefined
export function undefOr(type: 'boolean', val: unknown): boolean | undefined
export function undefOr(type: 'object', val: unknown): Obj | undefined
export function undefOr(type: 'array', val: unknown): unknown[] | undefined
export function undefOr(type: 'non-empty-string', val: unknown): string | undefined

export function undefOr(type: string, val: unknown) {
    if (val === undefined) return undefined

    switch (type) {
        case 'string':
            return String(val)
        case 'non-empty-string':
            if (String(val) !== '') return String(val)
            break
        case 'float':
            if (isFinite(Number(val))) return Number(val)
            break
        case 'int':
            if (isFinite(Number(val))) return Math.round(Number(val))
            break
        case 'uint': {
            const val2: number = Math.round(Number(val))
            if (val2 >= 0) return val
            break
        }
        case 'boolean':
            return Boolean(val)
        case 'object':
            if (isObject(val)) return val
            break
        case 'array':
            if (isArray(val)) return val
            break
    }
    return undefined
}
