export interface Ent {
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

export type BaseEnt = Pick<Ent, 'name' | 'path' | 'isDir' | 'isFile' | 'mtime' | 'size' | 'ext'>
