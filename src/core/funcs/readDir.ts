async function readDir(this: MaybeTask, path: string, deep: boolean = false): Promise<Ent[]> {
    path = entToPath(path)

    const fsEnts = await fs.readdir(path, { deep })
    const ents: Ent[] = await Promise.all(
        fsEnts.map((fsEnt) => {
            return makeEnt(fsEnt)
        })
    )
    return ents
}
