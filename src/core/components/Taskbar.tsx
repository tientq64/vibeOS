function Taskbar(): ReactNode {
    const { taskbar } = useOS()
    const noOSTasks = useTasks()

    return (
        <div
            className="row z-10 gap-2 border-t-2 bg-zinc-800 p-2"
            style={{
                height: taskbar.height
            }}
        >
            <div className="row">
                <Icon name="vibe-os" />
            </div>

            <div className="row flex-1 gap-2">
                {noOSTasks.map((task) => (
                    <TaskbarTask key={task.id} task={task} />
                ))}
            </div>

            <TaskbarTrays />
        </div>
    )
}
