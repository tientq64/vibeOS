import { taskSetup } from '@task/helpers/taskSetup'
import { useAsyncEffect } from 'ahooks'
import { ReactNode } from 'react'

interface FrameTaskProps {
    App: () => ReactNode
}

export function FrameTask({ App }: FrameTaskProps): ReactNode {
    useAsyncEffect(taskSetup, [])

    return <App />
}
