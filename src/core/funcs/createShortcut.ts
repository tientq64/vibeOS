import { Ent } from '@both/constants/ents'
import { Shortcut } from '@both/constants/shortcuts'
import { dumpYaml } from '@both/funcs/dumpYaml'
import { extPath } from '@both/funcs/extPath'
import { MaybeTask } from '@both/states/tasks'
import { fs } from '@core/constants/fs'
import { makeEnt } from '@core/helpers/makeEnt'

export async function createShortcut(
    this: MaybeTask,
    path: string,
    targetPath: string
): Promise<Ent> {
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
