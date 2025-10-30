function extPath(path: string, withDot?: boolean): string {
    const base: string = basePath(path)
    const index = base.lastIndexOf('.')
    const start = index + (withDot ? 0 : 1)
    return index > 0 ? base.slice(start) : ''
}
