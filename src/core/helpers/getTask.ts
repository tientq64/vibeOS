import { find } from '@both/funcs/find'
import { Task, tasks } from '@both/states/tasks'

export function getTask(taskId: number): Task | undefined {
    return find(tasks, { id: taskId })
}
