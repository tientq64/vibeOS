function useTasks(): Task[] {
    const { tasks: tasks2 } = useOS()

    const noOSTasks = useMemo<Task[]>(() => {
        return tasks.filter((task) => task.type !== AppTypeName.OS)
    }, [tasks2])

    return noOSTasks
}
