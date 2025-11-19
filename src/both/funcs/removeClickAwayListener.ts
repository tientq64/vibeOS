import { BothTask } from '@both/constants/bs'
import { remove } from '@both/funcs/remove'

export function removeClickAwayListener(
    this: BothTask,
    elemId: string,
    callback?: () => void
): void {
    let listeners = this.clickAwayManager.listeners
    if (listeners[elemId] === undefined) return

    let handlers = listeners[elemId].handlers
    if (callback === undefined) {
        handlers = []
    } else {
        remove(handlers, callback)
    }
    if (handlers.length === 0) {
        delete listeners[elemId]
    }
}
