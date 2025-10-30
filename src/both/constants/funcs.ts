
        const osFuncNames = [
            'frameInit',
'installApp',
'maximize',
'readDir',
'readFile',
'readVibeFile',
'resolveEntIcon',
'runTask',
'setFullscreen',
'writeFile'
        ]
        interface OSFuncs {
            frameInit: MakePromiseReturn<typeof frameInit>
installApp: MakePromiseReturn<typeof installApp>
maximize: MakePromiseReturn<typeof maximize>
readDir: MakePromiseReturn<typeof readDir>
readFile: MakePromiseReturn<typeof readFile>
readVibeFile: MakePromiseReturn<typeof readVibeFile>
resolveEntIcon: MakePromiseReturn<typeof resolveEntIcon>
runTask: MakePromiseReturn<typeof runTask>
setFullscreen: MakePromiseReturn<typeof setFullscreen>
writeFile: MakePromiseReturn<typeof writeFile>
        }
        const taskFuncNames = [
            
        ]
        interface TaskFuncs {
            
        }
    