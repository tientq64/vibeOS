import { CoreTask } from '@core/components/CoreTask'
import { Popups } from '@core/components/Popups'
import { Taskbar } from '@core/components/Taskbar'
import { coreSetup } from '@core/helpers/coreSetup'
import { updateUnixTime } from '@core/helpers/updateUnixTime'
import { useTasks } from '@core/hooks/useTasks'
import { useAsyncEffect, useInterval } from 'ahooks'
import { ReactNode } from 'react'

export function VibeOS(): ReactNode {
    const noOSTasks = useTasks()

    useAsyncEffect(coreSetup, [])
    useInterval(updateUnixTime, 30_000, { immediate: true })

    return (
        <div className="column h-full">
            <div className="relative flex-1">
                {noOSTasks.map((task) => (
                    <CoreTask key={task.id} task={task} />
                ))}
            </div>
            <Taskbar />
            <Popups />
        </div>
    )
}
