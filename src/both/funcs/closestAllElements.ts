export function closestAllElements<T extends Element>(el: Element, selector: string): T[] {
    const ancestors: T[] = []

    let currentEl: Element | null = el
    do {
        if (currentEl === null) break
        const ancestor: T | null = currentEl.closest(selector)
        if (ancestor === null) break
        ancestors.push(ancestor)
        currentEl = ancestor.parentElement
    } while (true)

    return ancestors
}
