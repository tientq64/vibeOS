function joinPath(...paths: string[]): string {
    return normPath(paths.join('/'))
}
