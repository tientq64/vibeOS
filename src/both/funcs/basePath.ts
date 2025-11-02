function basePath(path: string): string {
    const name: string | undefined = splitPath(path)[0].at(-1)
    return name ?? ''
}
