function stemPath(path: string): string {
    const base: string = basePath(path)
    const index: number = base.lastIndexOf('.')
    return index > 0 ? base.slice(0, index) : base
}
