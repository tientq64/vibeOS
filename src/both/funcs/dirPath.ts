function dirPath(path: string): string {
    const nodes: string[] = splitPath(path).slice(0, -1)

    if (nodes.length === 0) return '.'
    if (nodes[0] === '') return '/'

    return nodes.join('/')
}
