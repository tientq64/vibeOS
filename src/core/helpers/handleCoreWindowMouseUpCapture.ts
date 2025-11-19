import { mouse } from '@core/states/mouse'

export function handleCoreWindowMouseUpCapture(): void {
    mouse.isDown = false
}
