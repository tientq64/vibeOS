import { proxy } from 'valtio'

export interface Desktop {
    width: number
    height: number
    x: number
    y: number
}

export const desktop = proxy<Desktop>({
    width: innerWidth,
    height: innerHeight,
    x: 0,
    y: 0
})
