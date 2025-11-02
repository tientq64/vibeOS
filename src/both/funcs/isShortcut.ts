function isShortcut(val: unknown): val is Shortcut {
    return isObject(val) && isString(val.targetPath)
}
