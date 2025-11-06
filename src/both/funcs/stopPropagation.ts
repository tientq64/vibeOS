import { SyntheticEvent } from 'react'

export function stopPropagation(event: Event | SyntheticEvent): void {
    event.stopPropagation()
}
