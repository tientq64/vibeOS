function remove<T>(list: T[], predicate: Partial<Record<keyof T, unknown>>): T[] {
    const keys = Object.keys(predicate)

    const index: number = list.findIndex((item) => {
        return keys.every((key) => {
            return item[key as keyof T] === predicate[key as keyof typeof predicate]
        })
    })
    if (index >= 0) {
        list.splice(index, 1)
    }

    return list
}
