import { AppTypeName } from '@both/states/appTypes'
import { Task, tasks } from '@both/states/tasks'
import { useOS } from '@core/hooks/useOS'
import { useMemo } from 'react'

export function useTasks(): Task[] {
    const { tasks: tasks2 } = useOS()

    const noOSTasks = useMemo<Task[]>(() => {
        return tasks.filter((task) => task.type !== AppTypeName.OS)
    }, [tasks2])

    return noOSTasks
}
