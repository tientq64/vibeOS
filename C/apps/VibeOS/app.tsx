function VibeOS() {
    function App(): ReactNode {
        const noOSTasks = useTasks()

        useAsyncEffect(coreSetup, [])
        useInterval(updateUnixTime, 30000)

        return (
            <div className="column h-full">
                <div className="relative flex-1">
                    {noOSTasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </div>
                <Taskbar />
            </div>
        )
    }
    return App
}
