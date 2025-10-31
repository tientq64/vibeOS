function getApp(appPath: string): App | undefined {
    if (appPath.endsWith('/app.vibe')) {
        appPath = dirPath(appPath)
    }
    return find(apps, { path: appPath })
}
