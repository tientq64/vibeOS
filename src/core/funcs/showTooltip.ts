import { makeRect, RectLike } from '@both/funcs/makeRect'
import { MaybeTask } from '@both/states/tasks'
import { getTaskIframeDomRect } from '@core/helpers/getTaskIframeDomRect'
import { tooltip } from '@core/states/tooltip'

export function showTooltip(
    this: MaybeTask,
    elemId: string,
    text: string,
    rectLike: RectLike
): void {
    const offsetRect = getTaskIframeDomRect(this)
    const rect = makeRect(rectLike, offsetRect)

    tooltip.id = elemId
    tooltip.text = text
    tooltip.rect = rect
}
