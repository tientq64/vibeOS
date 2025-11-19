import { proxy } from 'valtio'

export interface Taskbar {
    height: number
}

export const taskbar = proxy<Taskbar>({
    height: 44
})
