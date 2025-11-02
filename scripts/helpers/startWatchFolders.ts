import { FSWatcher, watch } from 'chokidar'
import { generateCode } from './generateCode'

let watcher: FSWatcher | undefined

export function startWatchFolders(): void {
    if (watcher) {
        watcher.close()
    }
    const globs: string[] = [
        'src/{both,core,task}/{constants,states,components,hooks,funcs,helpers,store}/*',
        'C/**'
    ]
    watcher = watch(globs, { ignoreInitial: true })
        .on('add', generateCode)
        .on('addDir', generateCode)
        .on('unlink', generateCode)
        .on('unlinkDir', generateCode)
    console.log('Đang theo dõi các thư mục...')

    generateCode()
}
