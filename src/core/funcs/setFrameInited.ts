import { MaybeTask } from '@both/states/tasks'
import { os } from '@core/script'

export function setFrameInited(this: MaybeTask, frameInited: true): void {
    const task = this ?? os

    task.frameInited = frameInited
}
