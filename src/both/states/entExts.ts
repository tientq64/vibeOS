interface EntExt {
    icon: string
    exts?: string[]
    extsPattern?: RegExp
    bases?: string[]
    basesPattern?: RegExp
    paths?: string[]
    pathsPattern?: RegExp
    isDir: boolean
    noEditable: boolean
}

type EntExtInput = Optional<EntExt, 'isDir' | 'noEditable'>

const entExts = createProxy<EntExt[]>(() => {
    const inputs: EntExtInput[] = [
        {
            icon: '{appIcon}',
            bases: ['app.vibe']
        },
        {
            icon: 'file-code',
            extsPattern: /^(tsx?|jsx?|css|html|ya?ml)$/
        },
        {
            icon: 'file-image',
            extsPattern: /^(png|jpe?g|gif|webp|tiff?|jfif|apng|avif|svg|ico|cur|bmp|raw)$/
        },
        {
            icon: 'file-audio',
            extsPattern: /^(mp3|aac|wav|flac|mid)$/
        },
        {
            icon: 'file-video',
            extsPattern: /^(mp4|3gp|webm|avi|mov|wmv|mkv)$/
        },
        {
            icon: 'file-text',
            extsPattern: /^(txt)$/
        },
        {
            icon: 'folder',
            pathsPattern: /.*/,
            isDir: true,
            noEditable: true
        },
        {
            icon: 'file',
            pathsPattern: /.*/,
            noEditable: true
        }
    ]

    return inputs.map((input) => ({
        ...input,
        isDir: input.isDir ?? false,
        noEditable: input.noEditable ?? false
    }))
})
