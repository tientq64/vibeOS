async function readVibeFile(this: MaybeTask, vibePath: string): Promise<Obj> {
    if (!vibePath.endsWith('/app.vibe')) {
        vibePath += '/app.vibe'
    }

    const yaml: string = await readFile(vibePath)
    const vibe: unknown = parseYaml(yaml)

    if (!isObject(vibe) || !isString(vibe.name)) {
        throw Error('Tập tin .vibe không hợp lệ')
    }
    return vibe
}
