function basePath(path: string): string {
    const name: string | undefined = splitPath(path).at(-1)
    return name ?? ''
}
