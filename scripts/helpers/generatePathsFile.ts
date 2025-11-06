import { sync } from 'fast-glob'
import { writeFileSync } from 'fs'

export function generatePathsFile(): void {
    const globs = [
        '/src/{both,core,task}/**/*.{tsx,ts}', //
        '/src/both/**/*.css',
        '/src/core/**/*.css',
        '/src/task/**/*.css',
        '/C/apps/*',
        '/C/!(apps)/**'
    ]
    const Paths: Record<string, string[]> = {}
    for (const glob of globs) {
        Paths[glob] = sync(glob.slice(1), {
            onlyFiles: false
        }).map((path) => '/' + path)
    }
    const json = JSON.stringify(Paths, null, 4)
    writeFileSync('paths.json', json)
}
