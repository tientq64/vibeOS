import { dump } from 'js-yaml'

export function dumpYaml(data: unknown): string {
    return dump(data)
}
