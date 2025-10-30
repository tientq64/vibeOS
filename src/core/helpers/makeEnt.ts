async function makeEnt(fsEnt: FileSystemEntry | FileSystemEntryWithChildren): Promise<Ent> {
    const stat = await fs.stat(fsEnt)

    const baseEnt: BaseEnt = {
        name: stat.name,
        path: stat.fullPath,
        isDir: stat.isDirectory,
        isFile: stat.isFile,
        mtime: stat.modificationTime,
        size: stat.size,
        ext: extPath(stat.name)
    }
    const ent: Ent = {
        ...baseEnt,
        icon: await resolveEntIcon(baseEnt)
    }

    if ('children' in fsEnt) {
        ent.children = await Promise.all(
            fsEnt.children.map((subEnt) => {
                return makeEnt(subEnt)
            })
        )
    }

    return ent
}
