import { ref } from '@both/funcs/ref'

export type ClickAwayHandler = () => void

export interface ClickAwayListener {
    handlers: ClickAwayHandler[]
}

export type ClickAwayListenersMap = {
    [elemId: string]: ClickAwayListener | undefined
}

export interface ClickAwayManager {
    listeners: ClickAwayListenersMap
}

export const clickAwayManager = (): ClickAwayManager => {
    return ref({
        listeners: {}
    })
}
