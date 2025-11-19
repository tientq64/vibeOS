export const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export function intToRadix62(int: number): string {
    if (int === 0) return '0'

    const len: number = charset.length
    let radix62: string = ''

    while (int > 0) {
        radix62 = charset[int % len] + radix62
        int = Math.floor(int / len)
    }
    return radix62
}
