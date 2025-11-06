import { resolvePath } from '@both/funcs/resolvePath'
import { resolveShortcut } from '@core/funcs/resolveShortcut'

export async function realPath(...paths: string[]): Promise<string> {
    const path: string = resolvePath('/', ...paths)
    const finalPath: string = await resolveShortcut(path)
    return finalPath
}
