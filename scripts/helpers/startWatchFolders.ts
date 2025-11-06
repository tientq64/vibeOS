import { FSWatcher, watch } from 'chokidar'
import { generateCode } from './generateCode'

let watcher: FSWatcher | undefined

export function startWatchFolders(): void {
    if (watcher) {
        watcher.close()
    }
    const globs: string[] = [
        'src/{both,core,task}/**/*.{tsx,ts}', //
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
