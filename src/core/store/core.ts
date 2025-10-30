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
    frameInit
}

type Core = typeof core

let os: Task
