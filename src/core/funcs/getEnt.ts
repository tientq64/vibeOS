async function getEnt(path: string): Promise<Promise<Ent>> {
    const fsEnt = await fs.getEntry(path)
    const ent = await makeEnt(fsEnt)
    return ent
}
