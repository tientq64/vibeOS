import { BothTask } from '@both/constants/bs'

export function addClickAwayListener(this: BothTask, elemId: string, callback: () => void) {
    let listeners = this.clickAwayManager.listeners
    if (listeners[elemId] === undefined) {
        listeners[elemId] = {
            handlers: []
        }
    }

    const handlers = listeners[elemId].handlers
    if (handlers.includes(callback)) return

    handlers.push(callback)
}
