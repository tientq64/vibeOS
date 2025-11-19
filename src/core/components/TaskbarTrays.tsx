import { Tooltip } from '@both/components/Tooltip'
import { formatTime } from '@both/funcs/formatTime'
import { upperFirst } from '@both/funcs/upperFirst'
import { useOS } from '@core/hooks/useOS'
import { ReactNode } from 'react'

export function TaskbarTrays(): ReactNode {
    const {
        time: { unixTime }
    } = useOS()

    return (
        <div className="row">
            <Tooltip content={upperFirst(formatTime(unixTime, 'dddd, D MMMM, YYYY'))}>
                <div>{formatTime(unixTime, 'HH:mm, DD-MM-YYYY')}</div>
            </Tooltip>
        </div>
    )
}
