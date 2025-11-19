export function random(min: number, max: number): number
export function random(max: number): number
export function random(): number

export function random(min?: number, max?: number): number {
    if (arguments.length === 0) {
        min = 0
        max = Number.MAX_SAFE_INTEGER
    } else if (arguments.length === 1) {
        max = min
        min = 0
    }
    min = Number(min)
    max = Number(max)

    return min + Math.floor(Math.random() * (max - min + 1))
}
