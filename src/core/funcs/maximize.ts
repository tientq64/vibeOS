import { getTask } from '@core/helpers/getTask'

export function maximize(taskId: number, maximized?: boolean): void {
    const task = getTask(taskId)
    if (task === undefined) return

    maximized = Boolean(maximized ?? !task.maximized)
    task.maximized = maximized
}
