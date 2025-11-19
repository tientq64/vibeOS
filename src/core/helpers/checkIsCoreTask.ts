import { AppTypeName } from '@both/states/appTypes'
import { Task } from '@both/states/tasks'

export function checkIsCoreTask(task: Task): boolean {
    return task.type === AppTypeName.OS || task.type === AppTypeName.Core
}
