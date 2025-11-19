import { makeRect, Rect, RectLike } from '@both/funcs/makeRect'
import {
    autoPlacement,
    computePosition,
    flip,
    Placement,
    offset as popperOffset,
    shift,
    VirtualElement
} from '@floating-ui/dom'

export interface CreatePopperOptions {
    placement?: Placement
    fallbackPlacements?: Placement[]
    allowedPlacements?: Placement[]
    offset?: number
    crossOffset?: number
    inlineAddedCrossOffset?: number
    padding?: number
}

export async function createPopper(
    rectLike: RectLike,
    floating: HTMLElement,
    {
        placement,
        fallbackPlacements,
        allowedPlacements,
        offset,
        crossOffset = 0,
        inlineAddedCrossOffset,
        padding = 4
    }: CreatePopperOptions = {}
): Promise<void> {
    const placements = Array.isArray(placement) ? placement : [placement]

    let rect: Rect = makeRect(rectLike)

    const virtual: VirtualElement = {
        getBoundingClientRect: () => rect
    }

    // Đợi floating element tạo Tailwind class xong.
    // Side-effect khi sử dụng Tailwind runtime.
    await 0

    const position = await computePosition(virtual, floating, {
        strategy: 'absolute',
        placement: placements[0],
        middleware: [
            popperOffset((state) => {
                let crossAxis = crossOffset
                if (inlineAddedCrossOffset) {
                    if (/^(left|right)/.test(state.placement)) {
                        crossAxis += inlineAddedCrossOffset
                    }
                }
                return { mainAxis: offset, crossAxis }
            }),
            shift({
                padding
            }),
            allowedPlacements
                ? autoPlacement({
                      allowedPlacements
                  })
                : flip({
                      fallbackPlacements
                  })
        ]
    })
    const x = Math.round(position.x)
    const y = Math.round(position.y)

    Object.assign<CSSStyleDeclaration, Partial<CSSStyleDeclaration>>(floating.style, {
        position: position.strategy,
        left: x + 'px',
        top: y + 'px'
    })
    floating.classList.remove('vibe-popper-cloak')
}
