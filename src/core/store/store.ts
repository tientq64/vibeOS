import { MakePromiseReturn } from '@both/types/types'
import { desktop } from '@core/states/desktop'
import { taskbar } from '@core/states/taskbar'
import { createShortcut } from '@core/funcs/createShortcut'
import { getEnt } from '@core/funcs/getEnt'
import { getFrameInit } from '@core/funcs/getFrameInit'
import { installApp } from '@core/funcs/installApp'
import { maximize } from '@core/funcs/maximize'
import { readDir } from '@core/funcs/readDir'
import { readFile } from '@core/funcs/readFile'
import { readShortcut } from '@core/funcs/readShortcut'
import { readVibeFile } from '@core/funcs/readVibeFile'
import { realPath } from '@core/funcs/realPath'
import { resolveEntIcon } from '@core/funcs/resolveEntIcon'
import { resolveShortcut } from '@core/funcs/resolveShortcut'
import { runTask } from '@core/funcs/runTask'
import { setFrameInited } from '@core/funcs/setFrameInited'
import { setFullscreen } from '@core/funcs/setFullscreen'
import { writeFile } from '@core/funcs/writeFile'
export const coreFuncs = { createShortcut,getEnt,getFrameInit,installApp,maximize,readDir,readFile,readShortcut,readVibeFile,realPath,resolveEntIcon,resolveShortcut,runTask,setFrameInited,setFullscreen,writeFile }
export type CoreFuncs = typeof coreFuncs
export type CoreAsyncFuncs = {
createShortcut: MakePromiseReturn<typeof createShortcut>
getEnt: MakePromiseReturn<typeof getEnt>
getFrameInit: MakePromiseReturn<typeof getFrameInit>
installApp: MakePromiseReturn<typeof installApp>
maximize: MakePromiseReturn<typeof maximize>
readDir: MakePromiseReturn<typeof readDir>
readFile: MakePromiseReturn<typeof readFile>
readShortcut: MakePromiseReturn<typeof readShortcut>
readVibeFile: MakePromiseReturn<typeof readVibeFile>
realPath: MakePromiseReturn<typeof realPath>
resolveEntIcon: MakePromiseReturn<typeof resolveEntIcon>
resolveShortcut: MakePromiseReturn<typeof resolveShortcut>
runTask: MakePromiseReturn<typeof runTask>
setFrameInited: MakePromiseReturn<typeof setFrameInited>
setFullscreen: MakePromiseReturn<typeof setFullscreen>
writeFile: MakePromiseReturn<typeof writeFile>
}
export const coreMembers = { ...coreFuncs, desktop,taskbar }
export type CoreMember = typeof coreMembers