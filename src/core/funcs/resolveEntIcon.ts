async function resolveEntIcon(this: MaybeTask, ent: BaseEnt): Promise<string> {
    const entExt: EntExt | undefined = entExts.find((entExt) => {
        if (ent.isDir !== entExt.isDir) return

        if (entExt.pathsPattern?.exec(ent.path)) return true
        if (entExt.paths?.includes(ent.path)) return true

        if (entExt.basesPattern) {
            const base = basePath(ent.path)
            if (entExt.basesPattern.test(base)) return true
        }
        if (entExt.bases) {
            const base = basePath(ent.path)
            if (entExt.bases.includes(base)) return true
        }

        if (entExt.extsPattern?.exec(ent.ext)) return true
        if (entExt.exts?.includes(ent.ext)) return true
    })

    let icon: string | undefined = entExt?.icon

    if (icon === '{appIcon}') {
        const vibe = await readVibeFile(ent.path)
        if (isString(vibe.icon)) {
            icon = vibe.icon
        } else {
            icon = 'app-break'
        }
    }
    return icon ?? 'question-mark'
}
