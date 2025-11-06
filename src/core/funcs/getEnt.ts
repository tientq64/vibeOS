import { Ent } from '@both/constants/ents'
import { fs } from '@core/constants/fs'
import { makeEnt } from '@core/helpers/makeEnt'

export async function getEnt(path: string): Promise<Promise<Ent>> {
    const fsEnt = await fs.getEntry(path)
    const ent = await makeEnt(fsEnt)
    return ent
}
