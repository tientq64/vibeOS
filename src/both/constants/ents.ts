interface Ent {
    name: string
    path: string
    isDir: boolean
    isFile: boolean
    mtime: Date
    size: number
    ext: string
    icon: string
    children?: Ent[]
}

type BaseEnt = Pick<Ent, 'name' | 'path' | 'isDir' | 'isFile' | 'mtime' | 'size' | 'ext'>
