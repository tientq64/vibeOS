function dirPath(path: string): string {
    const [nodes, abs] = splitPath(path)
    return abs + nodes.slice(0, -1).join('/')
}
