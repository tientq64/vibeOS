function ref(obj: any) {
    if (isPrimitive(obj)) {
        return obj
    }
    return valtio.ref(obj)
}
