import { resolveMethods } from '@both/helpers/resolveMethods'
import { bothFuncs, type BothFuncs, bothStates, type BothStates } from '@both/store/store'
import type { CoreAsyncFuncs } from '@core/store/store'
import { makeCoreAsyncFuncs } from '@task/helpers/makeCoreAsyncFuncs'
import { taskFuncs, type TaskFuncs, taskStates, type TaskStates } from '@task/store/store'
import { proxy } from 'valtio'

export type TS = Readonly<BothStates & BothFuncs & TaskStates & TaskFuncs & CoreAsyncFuncs>

export const ts = Object.freeze(
    proxy<TS>({
        ...resolveMethods(bothStates),
        ...bothFuncs,
        ...resolveMethods(taskStates),
        ...taskFuncs,
        ...makeCoreAsyncFuncs()
    })
)
