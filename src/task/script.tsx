// @ts-nocheck

secretId = '__task.secretId__'

document.querySelector('#os-root > script')?.remove()
window.addEventListener('message', taskReceiveMessage)

await initFrame()

!(function (secretId, postMessageFunc, initFrame): void {
    // prettier-ignore
    __tsx__

    !(async function (): void {
        const App = await __task.name__?.(ts)

        if (typeof App === 'function') {
            const rootEl = document.getElementById('os-root')!
            ReactDOM.createRoot(rootEl).render(<FrameTask Component={App} />)
        }
    })()
})()
