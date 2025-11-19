import { proxy } from 'valtio'

export interface Mouse {
    isDown: boolean
}

export const mouse = proxy<Mouse>({
    isDown: false
})
