import { dirPath } from '@both/funcs/dirPath'
import { find } from '@both/funcs/find'
import { App, apps } from '@both/states/apps'

export function getApp(appPath: string): App | undefined {
    if (appPath.endsWith('/app.vibe')) {
        appPath = dirPath(appPath)
    }
    return find(apps, { path: appPath })
}
