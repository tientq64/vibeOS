const core = {
    desktop,
    taskbar,
    createShortcut,
    getEnt,
    getFrameInit,
    installApp,
    maximize,
    readDir,
    readFile,
    readShortcut,
    readVibeFile,
    realPath,
    resolveEntIcon,
    resolveShortcut,
    runTask,
    setFrameInited,
    setFullscreen,
    writeFile
}

type Core = typeof core

let os: Task
