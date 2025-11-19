import { clsx } from '@both/funcs/clsx'
import { ref } from '@both/funcs/ref'

export const enum ColorName {
    Zinc = 'zinc',
    Red = 'red',
    Amber = 'amber',
    Green = 'green',
    Blue = 'blue'
}

export interface Color {
    name: ColorName
    className: string
    menuItemClassName: string
}

export const colors = ref<Color[]>([
    {
        name: ColorName.Zinc,
        className: clsx('border-neutral-500 bg-neutral-600 shadow-neutral-600'),
        menuItemClassName: clsx('hover:bg-neutral-700 [.active]:bg-neutral-700')
    },
    {
        name: ColorName.Red,
        className: clsx('border-red-400 bg-red-500 shadow-red-500'),
        menuItemClassName: clsx('hover:bg-red-500 [.active]:bg-red-500')
    },
    {
        name: ColorName.Amber,
        className: clsx('border-amber-400 bg-amber-500 shadow-amber-500'),
        menuItemClassName: clsx('hover:bg-amber-500 [.active]:bg-amber-500')
    },
    {
        name: ColorName.Green,
        className: clsx('border-green-400 bg-green-500 shadow-green-500'),
        menuItemClassName: clsx('hover:bg-green-500 [.active]:bg-green-500')
    },
    {
        name: ColorName.Blue,
        className: clsx('border-blue-400 bg-blue-500 shadow-blue-500'),
        menuItemClassName: clsx('hover:bg-blue-500 [.active]:bg-blue-500')
    }
])

export const defaultColor: Color = colors[0]
