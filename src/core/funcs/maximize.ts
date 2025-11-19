import { MaybeTask } from '@both/states/tasks'
import { os } from '@core/script'

export function maximize(this: MaybeTask, maximized?: boolean): void {
    const task = this ?? os

    maximized = Boolean(maximized ?? !task.maximized)
    task.maximized = maximized
}
