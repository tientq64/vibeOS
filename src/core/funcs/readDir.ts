import { Ent } from '@both/constants/ents'
import { entToPath } from '@both/funcs/entToPath'
import { MaybeTask } from '@both/states/tasks'
import { fs } from '@core/constants/fs'
import { makeEnt } from '@core/helpers/makeEnt'

export async function readDir(
    this: MaybeTask,
    path: string,
    deep: boolean = false
): Promise<Ent[]> {
    path = entToPath(path)

    const fsEnts = await fs.readdir(path, { deep })
    const ents: Ent[] = await Promise.all(
        fsEnts.map((fsEnt) => {
            return makeEnt(fsEnt)
        })
    )
    return ents
}
