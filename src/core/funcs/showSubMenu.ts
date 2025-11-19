import { MenuItem } from '@both/funcs/makeMenu'
import { makeRect, RectLike } from '@both/funcs/makeRect'
import { ref } from '@both/funcs/ref'
import { MaybeTask } from '@both/states/tasks'
import { getTaskIframeDomRect } from '@core/helpers/getTaskIframeDomRect'
import { subMenu } from '@core/states/subMenu'

export function showSubMenu(
    this: MaybeTask,
    elemId: string,
    items: MenuItem[],
    rectLike: RectLike
): void {
    const offsetRect = getTaskIframeDomRect(this)
    const rect = makeRect(rectLike, offsetRect)

    subMenu.id = elemId
    subMenu.items = ref(items)
    subMenu.rect = rect
}
