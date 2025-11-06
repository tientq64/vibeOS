import { getTask } from '@core/helpers/getTask'

export function setFullscreen(taskId: number, fullscreen?: boolean): void {
    const task = getTask(taskId)
    if (task === undefined) return

    fullscreen = Boolean(fullscreen ?? !task.fullscreen)
    task.fullscreen = fullscreen
}
