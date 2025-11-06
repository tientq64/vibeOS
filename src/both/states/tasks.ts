import { App } from '@both/states/apps'
import { Obj } from '@both/types/types'
import { proxy } from 'valtio'

export interface Task {
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
