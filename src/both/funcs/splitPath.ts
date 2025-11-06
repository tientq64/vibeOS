export function splitPath(
    path: string | [string[], string],
    resolveDots?: boolean
): [string[], string] {
    let abs: string
    let nodes: string[]

    if (Array.isArray(path)) {
        ;[nodes, abs] = path
    } else {
        abs = path[0] === '/' ? '/' : ''
        nodes = Array.isArray(path) ? path : path.split(/\/+/)
    }
    const result: string[] = []

    nodes.forEach((node, i) => {
        switch (node) {
            case '':
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
                if (node.replaceAll('.', '') !== '') {
                    result.push(node)
                }
        }
    })
    return [result, abs]
}
