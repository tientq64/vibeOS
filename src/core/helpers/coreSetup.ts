import { AppInstallTypeName } from '@both/constants/appInstallTypes'
import { bothSetup } from '@both/helpers/bothSetup'
import { installApp } from '@core/funcs/installApp'
import { runTask } from '@core/funcs/runTask'
import { coreReceiveMessage } from '@core/helpers/coreReceiveMessage'
import { handleWindowResize } from '@core/helpers/handleWindowResize'

export async function coreSetup(): Promise<void> {
    await bothSetup()

    for (const path of Paths['/C/apps/*']) {
        if (path === '/C/apps/VibeOS') continue
        await installApp(AppInstallTypeName.Setup, path, path)
    }

    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('message', coreReceiveMessage)
    handleWindowResize()

    runTask('/C/apps/FileManager', {
        maximized: true,
        noHeader: true,
        args: {
            isDesktop: true,
            path: '/C/desktop',
            viewMode: 'tiles'
        }
    })
    runTask('/C/apps/CodeEditor')
}
