import { MaybeTask } from '@both/states/tasks'

export function getTaskIframeDomRect(task: MaybeTask): DOMRectReadOnly | undefined {
    if (task?.iframeEl === undefined) return
    return task.iframeEl.getBoundingClientRect()
}
