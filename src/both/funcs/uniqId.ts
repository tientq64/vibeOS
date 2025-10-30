function uniqId(): string {
    const now: string = Date.now().toString(36)
    const rand: string = Math.random().toString(36).slice(2)

    return `_${now}_${rand}`
}
