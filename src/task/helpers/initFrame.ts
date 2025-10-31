async function initFrame(): Promise<void> {
    const data = await ts.getFrameInit()
    if (data === undefined) {
        throw Error('Không nhận được dữ liệu khởi tạo')
    }

    secretId = data.secretId
    resetAssign(args, data.args)

    await ts.setFrameInited(true)

    ts.getFrameInit = noop as never
    ts.setFrameInited = noop as never
}
