import { sync } from 'fast-glob'
import { writeFileSync } from 'fs'
import { basename } from 'path'

function readBaseNames(glob: string): string[] {
    return sync(glob)
        .filter((path) => typeof path === 'string')
        .map((path) => basename(path).replace(/\.tsx?$/, ''))
}

export function generateFuncsFile(): void {
    const areas = [
        {
            name: 'both',
            upperName: 'Both',
            isBoth: true
        },
        {
            name: 'core',
            upperName: 'Core',
            isBoth: false
        },
        {
            name: 'task',
            upperName: 'Task',
            isBoth: false
        }
    ]
    let funcsCodes = []
    for (const { name, upperName, isBoth } of areas) {
        const states = readBaseNames(`src/${name}/states/*`)
        const funcs = readBaseNames(`src/${name}/funcs/*`)
        const members = [...states, ...funcs]

        const codes = [
            !isBoth && "import { MakePromiseReturn } from '@both/types/types'",
            states.map((state) => {
                return `import { ${state} } from '@${name}/states/${state}'`
            }),
            funcs.map((func) => {
                return `import { ${func} } from '@${name}/funcs/${func}'`
            }),
            `export const ${name}Funcs = { ${funcs} }`,
            `export type ${upperName}Funcs = typeof ${name}Funcs`,
            !isBoth && `export type ${upperName}AsyncFuncs = {`,
            !isBoth && funcs.map((func) => `${func}: MakePromiseReturn<typeof ${func}>`),
            !isBoth && '}',
            `export const ${name}Members = { ...${name}Funcs, ${states} }`,
            `export type ${upperName}Member = typeof ${name}Members`
        ]
        const code = codes.flat().filter(Boolean).join('\n').replace(/^ +/gm, '')
        writeFileSync(`src/${name}/store/store.ts`, code)

        funcsCodes.push(
            `export const ${name}FuncNames: string[] = [`,
            funcs.map((func) => `'${func}'`).join(','),
            ']'
        )
    }
    const funcsCode = funcsCodes.join('\n')
    writeFileSync('src/both/constants/funcNames.ts', funcsCode)
}
