import { isObject } from '@both/funcs/isObject'

export function clsx(...inputs: any[]): string {
    let classNames: string[] = []
    for (const input of inputs) {
        if (Array.isArray(input)) {
            classNames.push(clsx(...input))
        } else if (isObject(input)) {
            for (const [key, val] of Object.entries(input)) {
                if (val) classNames.push(key)
            }
        } else if (input) {
            classNames.push(String(input))
        }
    }
    return classNames.join(' ')
}
