async function resolveShortcut(path: string): Promise<string> {
    const ext: string = extPath(path)
    if (ext !== 'lnk') return path

    const shortcut: Shortcut = await readShortcut(path)
    return shortcut.targetPath
}
