import { intToRadix62 } from '@both/funcs/intToRadix62'
import { random } from '@both/funcs/random'

export function uniqId(): string {
    const now: string = intToRadix62(Date.now())
    const rand: string = intToRadix62(random())

    return `_${now}_${rand}`
}
