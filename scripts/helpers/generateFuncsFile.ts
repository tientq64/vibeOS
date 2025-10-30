import { sync } from 'fast-glob'
import { writeFileSync } from 'fs'
import { basename } from 'path'

export function generateFuncsFile(): void {
    const osFuncNames = sync('src/core/funcs/*').map((path) => basename(path, '.ts'))
    const taskFuncNames = sync('src/task/funcs/*').map((path) => basename(path, '.ts'))

    let code: string = `
        const osFuncNames = [
            ${osFuncNames.map((name) => `'${name}'`).join(',\n')}
        ]
        interface OSFuncs {
            ${osFuncNames.map((name) => `${name}: MakePromiseReturn<typeof ${name}>`).join('\n')}
        }
        const taskFuncNames = [
            ${taskFuncNames.map((name) => `'${name}'`).join(',\n')}
        ]
        interface TaskFuncs {
            ${taskFuncNames.map((name) => `${name}: MakePromiseReturn<typeof ${name}>`).join('\n')}
        }
    `
    writeFileSync('src/both/constants/funcs.ts', code)
}
