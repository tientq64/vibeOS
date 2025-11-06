interface Secret {
    secretId: string
    postMessage: Window['postMessage']
}

export const secret: Secret = {
    secretId: '',
    postMessage: parent.postMessage.bind(parent)
}
