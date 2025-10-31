async function coreSetup(): Promise<void> {
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
            path: '/C/apps',
            viewMode: 'tiles'
        }
    })
    runTask('/C/apps/FileManager')
}
