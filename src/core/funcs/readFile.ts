import { Ent } from '@both/constants/ents'
import { ReadFileDataType } from '@both/constants/readFileDataTypes'
import { entToPath } from '@both/funcs/entToPath'
import { MaybeTask } from '@both/states/tasks'
import { fs } from '@core/constants/fs'

export function readFile(
    this: MaybeTask,
    path: string | Ent,
    type: ReadFileDataType.DataUrl
): Promise<string>
export function readFile(
    this: MaybeTask,
    path: string | Ent,
    type: ReadFileDataType.Buffer
): Promise<ArrayBuffer>
export function readFile(
    this: MaybeTask,
    path: string | Ent,
    type: ReadFileDataType.Blob
): Promise<Blob>
export function readFile(
    this: MaybeTask,
    path: string | Ent,
    type: ReadFileDataType.File
): Promise<File>
export function readFile(
    this: MaybeTask,
    path: string | Ent,
    type?: ReadFileDataType.Text
): Promise<string>

export async function readFile(
    this: MaybeTask,
    path: string | Ent,
    type?: ReadFileDataType
): Promise<string | ArrayBuffer | Blob | File> {
    path = entToPath(path)

    const data = await fs.readFile(path, { type: type as any })
    return data
}
