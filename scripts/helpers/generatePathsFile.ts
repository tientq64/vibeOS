import { sync } from 'fast-glob'
import { writeJsonSync } from 'fs-extra'

export function generatePathsFile(): void {
    const globs = [
        '/src/both/constants/*',
        '/src/core/constants/*',
        '/src/task/constants/*',
        '/src/both/states/*',
        '/src/core/states/*',
        '/src/task/states/*',
        '/src/both/components/*',
        '/src/core/components/*',
        '/src/task/components/*',
        '/src/both/hooks/*',
        '/src/core/hooks/*',
        '/src/task/hooks/*',
        '/src/both/funcs/*',
        '/src/core/funcs/*',
        '/src/task/funcs/*',
        '/src/both/helpers/*',
        '/src/core/helpers/*',
        '/src/task/helpers/*',
        '/src/both/store/*',
        '/src/core/store/*',
        '/src/task/store/*',
        '/C/apps/*',
        '/C/!(apps)/**'
    ]
    const Paths: Record<string, string[]> = {}
    for (const glob of globs) {
        Paths[glob] = sync(glob.slice(1), {
            onlyFiles: false
        }).map((path) => '/' + path)
    }
    writeJsonSync('src/paths.json', Paths, { spaces: 4 })
}
