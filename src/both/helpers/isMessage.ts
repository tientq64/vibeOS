function isMessage(val: unknown): val is Message {
    if (!isObject(val)) return false
    if (!isString(val.messageId)) return false
    return true
}
