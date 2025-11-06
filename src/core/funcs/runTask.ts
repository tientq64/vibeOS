import { incrId } from '@both/funcs/incrId'
import { isObject } from '@both/funcs/isObject'
import { normPath } from '@both/funcs/normPath'
import { uniqId } from '@both/funcs/uniqId'
import { App } from '@both/states/apps'
import { AppTypeName } from '@both/states/appTypes'
import { MaybeTask, Task, TaskPrefer, tasks } from '@both/states/tasks'
import { bothMembers } from '@both/store/store'
import { Obj } from '@both/types/types'
import { getApp } from '@core/helpers/getApp'
import { undefOr } from '@core/helpers/undefOr'
import { desktop } from '@core/states/desktop'
import { coreMembers } from '@core/store/store'
import { proxy } from 'valtio'

export function runTask(this: MaybeTask, appPath: string, prefer: TaskPrefer = {}): Task {
    appPath = normPath(appPath)

    prefer = structuredClone(prefer)
    if (!isObject(prefer)) {
        throw Error('Tham số prefer không hợp lệ')
    }
    prefer = {
        icon: undefOr('non-empty-string', prefer.icon),
        title: undefOr('string', prefer.title),
        maximized: undefOr('boolean', prefer.maximized),
        minimized: undefOr('boolean', prefer.minimized),
        fullscreen: undefOr('boolean', prefer.fullscreen),
        width: undefOr('uint', prefer.width),
        height: undefOr('uint', prefer.height),
        x: undefOr('uint', prefer.x),
        y: undefOr('uint', prefer.y),
        noHeader: undefOr('boolean', prefer.noHeader),
        args: undefOr('object', prefer.args)
    }

    const app: App | undefined = getApp(appPath)
    if (app === undefined) {
        throw Error('Không tìm thấy ứng dụng cần chạy')
    }
    const taskId: number = incrId()
    const appId: string = app.id
    const name: string = app.name
    const type: AppTypeName = app.type
    const icon: string = prefer.icon ?? app.icon
    const title: string = prefer.title ?? app.title ?? app.name ?? app.path
    const maximized: boolean = prefer.maximized ?? app.maximized ?? false
    const minimized: boolean = prefer.minimized ?? app.minimized ?? false
    const fullscreen: boolean = prefer.fullscreen ?? app.fullscreen ?? false
    const width: number = prefer.width || app.width || 1000
    const height: number = prefer.height || app.height || 600
    const x: number = prefer.x ?? desktop.width / 2 - width / 2
    const y: number = prefer.y ?? desktop.height / 2 - height / 2
    const noHeader: boolean = prefer.noHeader ?? app.noHeader ?? false
    const args: Obj = structuredClone({ ...prefer.args, ...app.args })
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
        noHeader,
        args,
        secretId,
        frameInited,
        postMessage: undefined,
        ...bothMembers,
        ...coreMembers
    })
    tasks.push(task)

    return task
}
