async function readShortcut(path: string, count: number = 10): Promise<Shortcut> {
    if (count <= 0) {
        throw Error('Lối tắt có quá nhiều cấp')
    }

    const yaml: string = await fs.readFile(path)

    let data: unknown = parseYaml(yaml)
    if (!isShortcut(data)) {
        throw Error('Lối tắt không hợp lệ')
    }

    const targetExt = extPath(data.targetPath)
    if (targetExt === 'lnk') {
        data = readShortcut(data.targetPath, count - 1)
        if (!isShortcut(data)) {
            throw Error('Lối tắt không hợp lệ')
        }
    }

    return data
}
