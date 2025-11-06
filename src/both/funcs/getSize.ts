import { Size, SizeName, sizes } from '@both/states/sizes'

export function getSize(name: SizeName): Size
export function getSize(name: unknown): Size | undefined

export function getSize(name: unknown): Size | undefined {
    return sizes.find((size) => size.name === name)
}
