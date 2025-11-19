import { doms } from '@both/states/doms'
import { taskSetup } from '@task/helpers/taskSetup'
import { useAsyncEffect, useMemoizedFn } from 'ahooks'
import { ReactNode } from 'react'

interface FrameTaskProps {
    App: () => ReactNode
}

export function FrameTask({ App }: FrameTaskProps): ReactNode {
    const popupsRefCallback = useMemoizedFn((popupsEl: HTMLDivElement | null) => {
        if (popupsEl === null) return
        doms.popupsEl = popupsEl
    })

    useAsyncEffect(taskSetup, [])

    return (
        <div className="h-full">
            <App />

            <div ref={popupsRefCallback}></div>
        </div>
    )
}
