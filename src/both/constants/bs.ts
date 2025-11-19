import type { BothFuncs, BothStates } from '@both/store/store'
import type { CoreAsyncFuncs } from '@core/store/store'
import type { TaskAsyncFuncs } from '@task/store/store'

export type BothTask = BothStates & BothFuncs & (CoreAsyncFuncs | TaskAsyncFuncs)

export type MaybeBothTask = BothTask | undefined | void

declare global {
    const bs: BothTask

    interface Window {
        bs: typeof bs
    }
}
