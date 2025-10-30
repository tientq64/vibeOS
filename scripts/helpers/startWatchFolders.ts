import { watch } from 'chokidar'
import { generateCode } from './generateCode'

export function startWatchFolders(): void {
    const globs: string[] = [
        'src/{both,core,task}/{constants,states,components,hooks,funcs,helpers,store}/*',
        'C/**'
    ]
    watch(globs, { ignoreInitial: true })
        .on('add', generateCode)
        .on('addDir', generateCode)
        .on('unlink', generateCode)
        .on('unlinkDir', generateCode)
    generateCode()
}
