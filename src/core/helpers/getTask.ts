function getTask(taskId: number): Task | undefined {
    return find(tasks, { id: taskId })
}
