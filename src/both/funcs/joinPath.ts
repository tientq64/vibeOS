import { normPath } from '@both/funcs/normPath'

export function joinPath(...paths: string[]): string {
    return normPath(paths.join('/'))
}
