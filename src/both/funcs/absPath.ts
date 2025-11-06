import { normPath } from '@both/funcs/normPath'

export function absPath(path: string): string {
    return normPath('/' + path)
}
