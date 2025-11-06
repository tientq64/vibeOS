import { clsx } from '@both/funcs/clsx'
import { ref } from '@both/funcs/ref'

export enum ColorName {
    Zinc = 'zinc',
    Red = 'red',
    Amber = 'amber',
    Green = 'green',
    Blue = 'blue'
}

export interface Color {
    name: string
    className: string
}

export const colors: Color[] = ref([
    {
        name: ColorName.Zinc,
        className: clsx('border-neutral-500 bg-neutral-600 shadow-neutral-600')
    },
    {
        name: ColorName.Red,
        className: clsx('border-red-500 bg-red-600 shadow-red-600')
    },
    {
        name: ColorName.Amber,
        className: clsx('border-amber-500 bg-amber-600 shadow-amber-600')
    },
    {
        name: ColorName.Green,
        className: clsx('border-green-500 bg-green-600 shadow-green-600')
    },
    {
        name: ColorName.Blue,
        className: clsx('border-blue-500 bg-blue-600 shadow-blue-600')
    }
])
