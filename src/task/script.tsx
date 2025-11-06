import '@both/script'

import { FrameTask } from '@task/components/FrameTask'
import { secret } from '@task/constants/secret'
import { initFrame } from '@task/helpers/initFrame'
import { taskReceiveMessage } from '@task/helpers/taskReceiveMessage'
import { createRoot } from 'react-dom/client'

secret.secretId = '__secretId__'

document.querySelector('#os-root > script')?.remove()
window.addEventListener('message', taskReceiveMessage)

await initFrame()

const { App } = await import('@task/components/App')

const rootEl = document.getElementById('os-root')!
createRoot(rootEl).render(<FrameTask App={App} />)
