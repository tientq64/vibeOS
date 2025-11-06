import { os } from '@core/script'
import { useSnapshot } from 'valtio'

export function useOS(sync?: boolean) {
    return useSnapshot(os, { sync })
}
