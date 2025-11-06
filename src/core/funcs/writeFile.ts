import { Ent } from '@both/constants/ents'
import { entToPath } from '@both/funcs/entToPath'
import { MaybeTask } from '@both/states/tasks'
import { fs } from '@core/constants/fs'
import { makeEnt } from '@core/helpers/makeEnt'

export async function writeFile(
    this: MaybeTask,
    path: string | Ent,
    data: string | ArrayBuffer | Blob | File
): Promise<Ent> {
    path = entToPath(path)

    const fsFile = await fs.writeFile(path, data)

    const ent: Ent = await makeEnt(fsFile)
    return ent
}
