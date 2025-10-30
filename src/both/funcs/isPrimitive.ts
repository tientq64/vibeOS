function isPrimitive(val: unknown): val is Primitive {
    if (val === null) return true
    if (typeof val === 'object' || typeof val === 'function') return false
    return true
}
