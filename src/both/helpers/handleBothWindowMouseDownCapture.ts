import { closestAllElements } from '@both/funcs/closestAllElements'
import { isElement } from '@both/funcs/isElement'
import { isNull } from '@both/funcs/isNull'
import { unique } from '@both/funcs/unique'

export function handleBothWindowMouseDownCapture(event: MouseEvent): void {
    if (!isElement(event.target)) return

    const clickAwayEls = closestAllElements<HTMLElement>(event.target, '[data-vibe-click-away]')
    const clickArayElemIds: string[] = unique(
        clickAwayEls
            .map((el) => {
                return el.getAttribute('data-vibe-click-away')
            })
            .filter((attr) => !isNull(attr))
    )

    console.log(clickArayElemIds)
}
