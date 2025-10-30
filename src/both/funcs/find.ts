function find<T>(list: T[], predicate: Partial<Record<keyof T, unknown>>): T | undefined {
    const keys = Object.keys(predicate)

    return list.find((item) => {
        return keys.every((key) => {
            return item[key as keyof T] === predicate[key as keyof typeof predicate]
        })
    })
}
