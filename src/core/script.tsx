;(async function () {
    await fs.init({ bytes: 1024 * 1024 * 512 })

    const app: App = await installApp(AppInstallTypeName.OS, '/C/apps/VibeOS', '/C/apps/VibeOS')
    os = runTask(app.path)

    function OS(): ReactNode {
        useOS()
        return <Task task={os} />
    }

    const rootEl = document.getElementById('os-root')!
    ReactDOM.createRoot(rootEl).render(<OS />)
})()
