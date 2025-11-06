import { proxy } from 'valtio'

export interface Time {
    unixTime: number
}

export const time = proxy({
    unixTime: Date.now()
})
