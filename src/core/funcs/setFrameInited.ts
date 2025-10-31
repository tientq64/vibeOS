function setFrameInited(this: MaybeTask, frameInited: true): void {
    const task = this ?? os

    task.frameInited = frameInited
}
