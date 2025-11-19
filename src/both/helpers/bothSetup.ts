import { handleBothWindowMouseDownCapture } from '@both/helpers/handleBothWindowMouseDownCapture'
import { handleBothWindowMouseUpCapture } from '@both/helpers/handleBothWindowMouseUpCapture'

export async function bothSetup(): Promise<void> {
    window.addEventListener('mousedown', handleBothWindowMouseDownCapture, true)
    window.addEventListener('mouseup', handleBothWindowMouseUpCapture, true)
}
