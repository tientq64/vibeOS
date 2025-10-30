function resolvePath(...paths: string[]): string {
    if (paths.length === 0) return ''

    const nodes: string[] = []
    for (let i = paths.length - 1; i >= 0; i--) {
        const nodes2: string[] = splitPath(paths[i])
        nodes.unshift(...nodes2)
        if (nodes2[0] === '') break
    }

    return splitPath(nodes, true).join('/')
}
