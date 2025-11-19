import { MaybeTask } from '@both/states/tasks'
import { os } from '@core/script'
import { tooltip } from '@core/states/tooltip'

export function closeTooltip(this: MaybeTask, elemId?: string): void {
    const task = this ?? os

    if (elemId !== tooltip.id && task !== os) return

    tooltip.id = ''
    tooltip.text = ''
    tooltip.rect = undefined
}
