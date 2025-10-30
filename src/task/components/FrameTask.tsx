interface FrameTaskProps {
    Component: () => ReactNode
}

function FrameTask({ Component }: FrameTaskProps): ReactNode {
    useAsyncEffect(taskSetup, [])

    return <Component />
}
