import { charset } from '@both/funcs/intToRadix62'

export function radix62ToInt(radix62: string): number {
    let int: number = 0

    for (const char of radix62) {
        const index = charset.indexOf(char)
        if (index === -1) return NaN

        int = int * 62 + index
    }
    return int
}
