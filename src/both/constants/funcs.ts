
        const osFuncNames = [
            'getFrameInit',
'installApp',
'maximize',
'readDir',
'readFile',
'readVibeFile',
'resolveEntIcon',
'runTask',
'setFrameInited',
'setFullscreen',
'writeFile'
        ]
        interface OSFuncs {
            getFrameInit: MakePromiseReturn<typeof getFrameInit>
installApp: MakePromiseReturn<typeof installApp>
maximize: MakePromiseReturn<typeof maximize>
readDir: MakePromiseReturn<typeof readDir>
readFile: MakePromiseReturn<typeof readFile>
readVibeFile: MakePromiseReturn<typeof readVibeFile>
resolveEntIcon: MakePromiseReturn<typeof resolveEntIcon>
runTask: MakePromiseReturn<typeof runTask>
setFrameInited: MakePromiseReturn<typeof setFrameInited>
setFullscreen: MakePromiseReturn<typeof setFullscreen>
writeFile: MakePromiseReturn<typeof writeFile>
        }
        const taskFuncNames = [
            
        ]
        interface TaskFuncs {
            
        }
    