async function writeFile(
    this: MaybeTask,
    path: string | Ent,
    data: string | ArrayBuffer | Blob | File
): Promise<Ent> {
    path = entToPath(path)

    const fsFile = await fs.writeFile(path, data)

    const ent: Ent = await makeEnt(fsFile)
    return ent
}
