// @ts-nocheck

secretId = '__task.secretId__'

document.querySelector('#os-root > script')?.remove()
window.addEventListener('message', taskReceiveMessage)

const data = await ts.frameInit()
secretId = data.secretId

!(function (secretId, postMessageFunc): void {
    // prettier-ignore
    __tsx__

    !(async function (): void {
        const App = await __task.name__?.()

        if (typeof App === 'function') {
            const rootEl = document.getElementById('os-root')!
            ReactDOM.createRoot(rootEl).render(<FrameTask Component={App} />)
        }
    })()
})()
