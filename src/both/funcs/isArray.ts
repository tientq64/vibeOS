export function isArray<T>(val: unknown): val is T[] {
    return Array.isArray(val)
}
