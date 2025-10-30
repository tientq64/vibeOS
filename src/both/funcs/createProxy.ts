function createProxy<T extends object>(input: T | (() => T)): T {
    if (isFunction(input)) {
        input = input()
    }
    return proxy(input)
}
