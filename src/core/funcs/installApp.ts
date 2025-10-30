async function installApp(
    this: MaybeTask,
    installType: AppInstallTypeName,
    srcPath: string,
    destPath: string
): Promise<App> {
    let tsx: string = ''
    let css: string = ''

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

    function cast(func: StringConstructor, val: unknown): string | undefined
    function cast(func: NumberConstructor, val: unknown): number | undefined
    function cast(func: BooleanConstructor, val: unknown): boolean | undefined
    function cast(func: StringConstructor | NumberConstructor | BooleanConstructor, val: unknown) {
        return val === undefined ? undefined : func(val)
    }

    const appId: string = uniqId()
    const appPath: string = destPath
    const name: string = vibe.name
    const type: AppTypeName = getAppType(vibe.type)?.name ?? AppTypeName.Normal
    const icon: string = String(vibe.icon || 'app')
    const title: string | undefined = cast(String, vibe.title)
    const maximized: boolean | undefined = cast(Boolean, vibe.maximized)
    const minimized: boolean | undefined = cast(Boolean, vibe.minimized)
    const fullscreen: boolean | undefined = cast(Boolean, vibe.fullscreen)
    const width: number | undefined = cast(Number, vibe.width)
    const height: number | undefined = cast(Number, vibe.height)
    const x: number | undefined = cast(Number, vibe.x)
    const y: number | undefined = cast(Number, vibe.y)

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
        installType
    })
    apps.push(app)

    return app
}
