import { uniqId } from '@both/funcs/uniqId'
import { useMemo } from 'react'

export function useUniqId(): string {
    return useMemo(() => uniqId(), [])
}
