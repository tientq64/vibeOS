function runTask(this: MaybeTask, appPath: string): Task {
    appPath = normPath(appPath)

    const app: App | undefined = apps.find((app2) => app2.path === appPath)
    if (app === undefined) {
        throw Error('Không tìm thấy ứng dụng cần chạy')
    }
    const taskId: number = incrId()
    const appId: string = app.id
    const name: string = app.name
    const type: AppTypeName = app.type
    const icon: string = app.icon
    const title: string = app.title ?? app.name ?? app.path
    const maximized: boolean = app.maximized ?? false
    const minimized: boolean = app.minimized ?? false
    const fullscreen: boolean = app.fullscreen ?? false
    const width: number = app.width || 1000
    const height: number = app.height || 600
    const x: number = Math.floor(desktop.width / 2 - width / 2)
    const y: number = Math.floor(desktop.height / 2 - height / 2)
    const secretId: string = uniqId()
    const frameInited: boolean = false

    const task: Task = proxy({
        id: taskId,
        appId,
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
        secretId,
        frameInited,
        postMessage: undefined,
        ...both,
        ...core
    })
    tasks.push(task)

    return task
}
