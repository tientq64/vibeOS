function isObject(val: unknown): val is Obj {
    return val !== null && typeof val === 'object'
}
