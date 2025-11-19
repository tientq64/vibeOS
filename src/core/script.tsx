import '@both/script'

import { AppInstallTypeName } from '@both/constants/appInstallTypes'
import { App } from '@both/states/apps'
import { Task } from '@both/states/tasks'
import { CoreTask } from '@core/components/CoreTask'
import { fs } from '@core/constants/fs'
import { installApp } from '@core/funcs/installApp'
import { runTask } from '@core/funcs/runTask'
import { useOS } from '@core/hooks/useOS'
import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

await fs.init({ bytes: 1024 * 1024 * 512 })

const app: App = await installApp(AppInstallTypeName.OS, '/C/apps/VibeOS', '/C/apps/VibeOS')
export const os: Task = runTask(app.path)

window.bs = os

function OS(): ReactNode {
    useOS()
    return <CoreTask task={os} />
}

const rootEl = document.getElementById('vibe-root')!
createRoot(rootEl).render(<OS />)
