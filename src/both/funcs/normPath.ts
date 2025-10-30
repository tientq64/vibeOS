function normPath(path: string): string {
    return splitPath(path, true).join('/')
}
