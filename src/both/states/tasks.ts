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
    noHeader: boolean
    args: Obj
    secretId: string
    frameInited: boolean
    postMessage: Window['postMessage'] | undefined
}

type TaskPrefer = Partial<
    Pick<
        Task,
        | 'icon'
        | 'title'
        | 'maximized'
        | 'minimized'
        | 'fullscreen'
        | 'width'
        | 'height'
        | 'x'
        | 'y'
        | 'noHeader'
        | 'args'
    >
>

type MaybeTask = Task | undefined | void

const tasks: Task[] = proxy([])
