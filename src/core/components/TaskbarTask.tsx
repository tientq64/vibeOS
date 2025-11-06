import { Button } from '@both/components/Button'
import { Task } from '@both/states/tasks'
import { ReactNode } from 'react'

interface TaskbarTaskProps {
    task: Task
}

export function TaskbarTask({ task }: TaskbarTaskProps): ReactNode {
    return (
        <Button className="row gap-2 overflow-hidden" icon={task.icon}>
            {task.title}
        </Button>
    )
}
