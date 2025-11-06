import { load } from 'js-yaml'

export function parseYaml(str: string): unknown {
    return load(str)
}
