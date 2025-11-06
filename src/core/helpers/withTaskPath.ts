import { resolvePath } from '@both/funcs/resolvePath'
import { MaybeTask } from '@both/states/tasks'
import { os } from '@core/script'

export function withTaskPath(task: MaybeTask = os, path: string): string {
    return resolvePath(task.path, path)
}
