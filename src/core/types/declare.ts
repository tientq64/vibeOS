import BroFs from 'bro-fs'
import TypeScript from 'typescript'

declare global {
    const typescript: typeof TypeScript
    const compilerOptions: TypeScript.CompilerOptions
    const fs: typeof BroFs

    type FileSystemEntryWithChildren = BroFs.FileSystemEntryWithChildren
}
