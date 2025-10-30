interface Task extends Both, Core {
    id: number
    appId: App['id']
    path: App['path']
    name: App['name']
    type: App['type']
    icon: App['icon']
    title: string
    maximized: boolean
    minimized: boolean
    fullscreen: boolean
    width: number
    height: number
    x: number
    y: number
    secretId: string
    frameInited: boolean
    postMessage: Window['postMessage'] | undefined
}

type MaybeTask = Task | undefined | void

const tasks: Task[] = proxy([])
