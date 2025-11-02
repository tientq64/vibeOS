async function createShortcut(this: MaybeTask, path: string, targetPath: string): Promise<Ent> {
    const task = this ?? os

    const ext: string = extPath(path)
    if (ext !== 'lnk') {
        throw Error('Tệp lối tắt phải có phần mở rộng .lnk')
    }

    const shortcut: Shortcut = {
        targetPath
    }
    const yaml: string = dumpYaml(shortcut)
    const fsFile = await fs.writeFile(path, yaml)
    const file: Ent = await makeEnt(fsFile)
    return file
}
