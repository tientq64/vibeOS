function Taskbar(): ReactNode {
    const { taskbar } = useOS()
    const noOSTasks = useTasks()

    return (
        <div
            className="z-10 border-t-2 border-black"
            style={{
                height: taskbar.height
            }}
        >
            <div className="row gap-2 border-t-2 bg-neutral-800 px-2 py-1">
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
        </div>
    )
}
