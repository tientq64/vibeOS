export function round(num: number, precision: number = 0): number {
    if (precision === 0) {
        return Math.round(num)
    }
    const factor = 10 ** precision
    return Math.round(num * factor) / factor
}
