import { clsx } from '@both/funcs/clsx'
import { twMerge } from 'tailwind-merge'

export function tw(...inputs: any[]): string {
    if (inputs.length <= 1) {
        return clsx(inputs[0])
    }
    return twMerge(...inputs)
}
