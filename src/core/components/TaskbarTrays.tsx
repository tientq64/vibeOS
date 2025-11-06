import { formatTime } from '@both/funcs/formatTime'
import { useOS } from '@core/hooks/useOS'
import { ReactNode } from 'react'

export function TaskbarTrays(): ReactNode {
    const {
        time: { unixTime }
    } = useOS()

    return (
        <div className="row">
            <div>{formatTime(unixTime, 'HH:mm, DD-MM-YYYY')}</div>
        </div>
    )
}
