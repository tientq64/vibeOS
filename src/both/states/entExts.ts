import { Optional } from '@both/types/types'
import { proxy } from 'valtio'

export interface EntExt {
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

const inputs: EntExtInput[] = [
    {
        icon: '{appIcon}',
        bases: ['app.vibe'],
        noEditable: true
    },
    {
        icon: '{targetIcon}',
        exts: ['lnk'],
        noEditable: true
    },
    {
        icon: 'typescript',
        extsPattern: /^(tsx?)$/
    },
    {
        icon: 'javascript',
        extsPattern: /^(jsx?)$/
    },
    {
        icon: 'css',
        extsPattern: /^(css?)$/
    },
    {
        icon: 'html',
        extsPattern: /^(html?)$/
    },
    {
        icon: 'code',
        extsPattern: /^(json|ya?ml)$/
    },
    {
        icon: 'image',
        extsPattern: /^(png|jpe?g|gif|webp|tiff?|jfif|apng|avif|svg|ico|cur|bmp|raw)$/
    },
    {
        icon: 'volume-up',
        extsPattern: /^(mp3|aac|wav|flac|mid)$/
    },
    {
        icon: 'video',
        extsPattern: /^(mp4|3gp|webm|avi|mov|wmv|mkv)$/
    },
    {
        icon: 'markdown',
        extsPattern: /^(md)$/
    },
    {
        icon: 'paragraph',
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

export const entExts = proxy<EntExt[]>(
    inputs.map((input) => ({
        ...input,
        isDir: input.isDir ?? false,
        noEditable: input.noEditable ?? false
    }))
)
