import { SyntheticEvent } from 'react'

export function isSelfEvent(event: Event | SyntheticEvent): boolean {
    return event.currentTarget === event.target
}
