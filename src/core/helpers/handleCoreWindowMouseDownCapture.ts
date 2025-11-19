import { mouse } from '@core/states/mouse'

export function handleCoreWindowMouseDownCapture(): void {
    mouse.isDown = true
}
