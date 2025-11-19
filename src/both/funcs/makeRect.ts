export interface Rect {
    x: number
    y: number
    width: number
    height: number
    left: number
    top: number
    right: number
    bottom: number
}

export type RectInput = Pick<Rect, 'x' | 'y'> & Partial<Pick<Rect, 'width' | 'height'>>
export type RectLike = RectInput | Rect | DOMRectReadOnly

export function makeRect({ x, y, width = 0, height = 0 }: RectLike, offsetRect?: RectLike): Rect {
    if (offsetRect) {
        x += offsetRect.x
        y += offsetRect.y
    }
    x = Math.round(x)
    y = Math.round(y)
    width = Math.round(width)
    height = Math.round(height)
    return {
        x,
        y,
        width,
        height,
        left: x,
        top: y,
        right: x + width,
        bottom: y + height
    }
}
