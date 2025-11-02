function resolvePath(...paths: string[]): string {
    if (paths.length === 0) return ''

    let nodes: string[] = []
    let abs: string = ''
    for (let i = paths.length - 1; i >= 0; i--) {
        const [nodes2, abs] = splitPath(paths[i])
        nodes.unshift(...nodes2)
        if (abs === '/') break
    }

    ;[nodes, abs] = splitPath([nodes, abs], true)
    return abs + nodes.join('/')
}
