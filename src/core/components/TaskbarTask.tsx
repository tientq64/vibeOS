interface TaskbarTaskProps {
    task: Task
}

function TaskbarTask({ task }: TaskbarTaskProps): ReactNode {
    return (
        <Button className="row gap-2 overflow-hidden" icon={task.icon}>
            {task.title}
        </Button>
    )
}
