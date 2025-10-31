const core = {
    taskbar,
    desktop,
    readFile,
    writeFile,
    readDir,
    readVibeFile,
    installApp,
    runTask,
    setFullscreen,
    maximize,
    resolveEntIcon,
    getFrameInit,
    setFrameInited
}

type Core = typeof core

let os: Task
