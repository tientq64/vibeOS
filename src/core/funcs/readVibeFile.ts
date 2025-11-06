import { isObject } from '@both/funcs/isObject'
import { isString } from '@both/funcs/isString'
import { parseYaml } from '@both/funcs/parseYaml'
import { MaybeTask } from '@both/states/tasks'
import { Obj } from '@both/types/types'
import { readFile } from '@core/funcs/readFile'

export async function readVibeFile(this: MaybeTask, vibePath: string): Promise<Obj> {
    if (!vibePath.endsWith('/app.vibe')) {
        vibePath += '/app.vibe'
    }

    const yaml: string = await readFile(vibePath)
    const vibe: unknown = parseYaml(yaml)

    if (!isObject(vibe) || !isString(vibe.name)) {
        throw Error('Tập tin .vibe không hợp lệ')
    }
    return vibe
}
