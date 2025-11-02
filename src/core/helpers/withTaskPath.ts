function withTaskPath(task: MaybeTask = os, path: string): string {
    return resolvePath(task.path, path)
}
