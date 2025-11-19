import { uniqId } from '@both/funcs/uniqId'
import { useState } from 'react'

export function useUniqId(initId?: string): [string, () => string] {
    const [id, setId] = useState<string>(initId ?? uniqId)

    const getNewId = (): string => {
        const newId = uniqId()
        setId(newId)
        return newId
    }
    return [id, getNewId]
}
