import { BaseEnt } from '@both/constants/ents'
import { basePath } from '@both/funcs/basePath'
import { EntExt, entExts } from '@both/states/entExts'
import { getEnt } from '@core/funcs/getEnt'
import { resolveShortcut } from '@core/funcs/resolveShortcut'
import { getApp } from '@core/helpers/getApp'

export async function resolveEntIcon(ent: BaseEnt): Promise<string> {
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
        const app = getApp(ent.path)
        icon = app?.icon ?? 'task-break'
    } else if (icon === '{targetIcon}') {
        try {
            const targetPath = await resolveShortcut(ent.path)
            const targetEnt = await getEnt(targetPath)
            icon = targetEnt.icon
        } catch {
            icon = 'file-break'
        }
    }

    return icon ?? 'question-mark'
}
