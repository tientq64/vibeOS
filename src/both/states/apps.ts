interface App {
    id: string
    path: string
    name: string
    type: AppTypeName
    icon: string
    title: string | undefined
    maximized: boolean | undefined
    minimized: boolean | undefined
    fullscreen: boolean | undefined
    width: number | undefined
    height: number | undefined
    x: number | undefined
    y: number | undefined
    noHeader: boolean | undefined
    args: Obj | undefined
    installType: AppInstallTypeName
}

const apps: App[] = proxy([])
