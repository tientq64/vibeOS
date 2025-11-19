export function remove<T>(arr: T[], item: any): T[] {
    const index = arr.indexOf(item)
    if (index >= 0) {
        arr.splice(index, 1)
    }
    return arr
}
