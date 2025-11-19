import { Rect } from '@both/funcs/makeRect'
import { proxy } from 'valtio'

export interface Tooltip {
    id: string
    text: string
    rect: Rect | undefined
}

export const tooltip = proxy<Tooltip>({
    id: '',
    text: '',
    rect: undefined
})
