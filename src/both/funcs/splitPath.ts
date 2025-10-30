function splitPath(path: string | string[], resolveDots?: boolean): string[] {
    if (path === '') return []

    const nodes: string[] = Array.isArray(path) ? path : path.split(/\/+/)

    const result: string[] = []
    nodes.forEach((node, i) => {
        switch (node) {
            case '':
                if (i === 0) result.push(node)
                break
            case '.':
                if (!resolveDots) {
                    result.push(node)
                }
                break
            case '..':
                if (resolveDots) {
                    result.pop()
                } else {
                    result.push(node)
                }
                break
            default:
                result.push(node)
        }
    })
    return result
}
