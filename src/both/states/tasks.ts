import { App } from '@both/states/apps'
import type { BothFuncs, BothStates } from '@both/store/store'
import { Obj } from '@both/types/types'
import type { CoreFuncs, CoreStates } from '@core/store/store'
import { TaskAsyncFuncs } from '@task/store/store'
import { proxy } from 'valtio'

export interface Task extends BothStates, BothFuncs, CoreStates, CoreFuncs, TaskAsyncFuncs {
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
    frameInited: boolean
    iframeEl: HTMLIFrameElement | undefined
}

export type TaskPrefer = Partial<
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

export type MaybeTask = Task | undefined | void

export const tasks: Task[] = proxy([])
