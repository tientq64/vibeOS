import { Task } from '@both/states/tasks'
import { os } from '@core/script'
import { useProxy } from 'valtio/utils'

export function useOS(sync?: boolean): Task {
    return useProxy(os, { sync })
}
