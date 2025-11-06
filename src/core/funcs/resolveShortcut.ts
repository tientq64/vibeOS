import { Shortcut } from '@both/constants/shortcuts'
import { extPath } from '@both/funcs/extPath'
import { readShortcut } from '@core/funcs/readShortcut'

export async function resolveShortcut(path: string): Promise<string> {
    const ext: string = extPath(path)
    if (ext !== 'lnk') return path

    const shortcut: Shortcut = await readShortcut(path)
    return shortcut.targetPath
}
