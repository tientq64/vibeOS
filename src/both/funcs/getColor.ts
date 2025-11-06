import { Color, ColorName, colors } from '@both/states/colors'

export function getColor(name: ColorName): Color
export function getColor(name: unknown): Color | undefined

export function getColor(name: unknown): Color | undefined {
    return colors.find((color) => color.name === name)
}
