import { AppInstallTypeName } from '@both/constants/appInstallTypes'
import { getAppType } from '@both/funcs/getAppType'
import { isObject } from '@both/funcs/isObject'
import { isString } from '@both/funcs/isString'
import { joinPath } from '@both/funcs/joinPath'
import { parseYaml } from '@both/funcs/parseYaml'
import { uniqId } from '@both/funcs/uniqId'
import { App, apps } from '@both/states/apps'
import { AppTypeName } from '@both/states/appTypes'
import { MaybeTask } from '@both/states/tasks'
import { Obj } from '@both/types/types'
import { createShortcut } from '@core/funcs/createShortcut'
import { writeFile } from '@core/funcs/writeFile'
import { undefOr } from '@core/helpers/undefOr'
import { proxy } from 'valtio'

export async function installApp(
    this: MaybeTask,
    installType: AppInstallTypeName,
    srcPath: string,
    destPath: string
): Promise<App> {
    let tsx: string = ''
    let css: string = ''
    let html: string = ''

    const srcVibePath: string = joinPath(srcPath, 'app.vibe')
    const vibeRes: Response = await fetch(srcVibePath)
    if (!vibeRes.ok) {
        throw Error('Không tìm thấy tập tin khai báo')
    }
    const vibeText: string = await vibeRes.text()

    const vibe: unknown = parseYaml(vibeText)
    if (!isObject(vibe)) {
        throw Error('Thông tin ứng dụng không xác định')
    }
    if (!isString(vibe.name)) {
        throw Error('Không tìm thấy tên ứng dụng')
    }

    const appId: string = uniqId()
    const appPath: string = destPath
    const name: string = vibe.name
    const type: AppTypeName = getAppType(vibe.type)?.name ?? AppTypeName.Normal
    const icon: string = undefOr('non-empty-string', vibe.icon) ?? 'task'
    const title: string | undefined = undefOr('string', vibe.title)
    const maximized: boolean | undefined = undefOr('boolean', vibe.maximized)
    const minimized: boolean | undefined = undefOr('boolean', vibe.minimized)
    const fullscreen: boolean | undefined = undefOr('boolean', vibe.fullscreen)
    const width: number | undefined = undefOr('uint', vibe.width)
    const height: number | undefined = undefOr('uint', vibe.height)
    const x: number | undefined = undefOr('uint', vibe.x)
    const y: number | undefined = undefOr('uint', vibe.y)
    const noHeader: boolean | undefined = undefOr('boolean', vibe.noHeader)
    const args: Obj | undefined = undefOr('object', vibe.args)

    const srcTsxPath: string = joinPath(srcPath, 'app.tsx')
    const tsxRes: Response = await fetch(srcTsxPath)
    if (tsxRes.ok) {
        tsx = await tsxRes.text()
    }

    const srcCssPath: string = joinPath(srcPath, 'app.css')
    const cssRes: Response = await fetch(srcCssPath)
    if (cssRes.ok) {
        css = await cssRes.text()
    }

    const srcHtmlPath: string = joinPath(srcPath, 'index.html')
    const htmlRes: Response = await fetch(srcHtmlPath)
    if (htmlRes.ok) {
        html = await htmlRes.text()
    }

    const destVibePath: string = joinPath(destPath, 'app.vibe')
    await writeFile(destVibePath, vibeText)
    if (tsx) {
        const destTsxPath: string = joinPath(destPath, 'app.tsx')
        await writeFile(destTsxPath, tsx)
    }
    if (css) {
        const destCssPath: string = joinPath(destPath, 'app.css')
        await writeFile(destCssPath, css)
    }
    if (html) {
        const destHtmlPath: string = joinPath(destPath, 'index.html')
        await writeFile(destHtmlPath, html)
    }

    const app: App = proxy({
        id: appId,
        path: appPath,
        name,
        type,
        icon,
        title,
        maximized,
        minimized,
        fullscreen,
        width,
        height,
        x,
        y,
        noHeader,
        args,
        installType
    })
    apps.push(app)

    await createShortcut(joinPath('/C/desktop', `${app.name}.lnk`), destVibePath)

    return app
}
