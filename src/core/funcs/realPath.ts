async function realPath(...paths: string[]): Promise<string> {
    const path: string = resolvePath('/', ...paths)
    const finalPath: string = await resolveShortcut(path)
    return finalPath
}
