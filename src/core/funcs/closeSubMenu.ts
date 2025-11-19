import { MaybeTask } from '@both/states/tasks'
import { os } from '@core/script'
import { subMenu } from '@core/states/subMenu'

export function closeSubMenu(this: MaybeTask, elemId?: string): void {
    const task = this ?? os

    if (elemId !== subMenu.id && task !== os) return

    subMenu.id = ''
    subMenu.items = []
    subMenu.rect = undefined
}
