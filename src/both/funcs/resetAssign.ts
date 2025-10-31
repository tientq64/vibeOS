function resetAssign<T extends {}, U>(target: T, source: T & U): T {
    for (const key in target) {
        delete target[key]
    }
    Object.assign(target, source)

    return target
}
