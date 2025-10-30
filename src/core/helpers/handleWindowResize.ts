function handleWindowResize(): void {
    desktop.width = innerWidth
    desktop.height = innerHeight - taskbar.height
    desktop.x = 0
    desktop.y = 0
}
