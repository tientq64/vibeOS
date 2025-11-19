import { ref } from '@both/funcs/ref'
import '@both/script'

import { FrameTask } from '@task/components/FrameTask'
import { initFrame } from '@task/helpers/initFrame'
import { taskReceiveMessage } from '@task/helpers/taskReceiveMessage'
import { ts } from '@task/store/ts'
import { createRoot } from 'react-dom/client'

ts.messenger.secretId = '__secretId__'
ts.messenger.postMessage = ref(parent.postMessage.bind(parent))

window.bs = ts

document.querySelector('#vibe-root > script')?.remove()
window.addEventListener('message', taskReceiveMessage)

await initFrame()

const { App } = await import('@task/components/App')

const rootEl = document.getElementById('vibe-root')!
createRoot(rootEl).render(<FrameTask App={App} />)
