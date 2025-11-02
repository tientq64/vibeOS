function normPath(path: string): string {
    const [nodes, abs] = splitPath(path, true)
    return abs + nodes.join('/')
}
