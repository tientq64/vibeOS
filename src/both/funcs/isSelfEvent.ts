function isSelfEvent(event: Event | SyntheticEvent): boolean {
    return event.currentTarget === event.target
}
