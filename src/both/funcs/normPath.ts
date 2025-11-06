import { splitPath } from '@both/funcs/splitPath'

export function normPath(path: string): string {
    const [nodes, abs] = splitPath(path, true)
    return abs + nodes.join('/')
}
