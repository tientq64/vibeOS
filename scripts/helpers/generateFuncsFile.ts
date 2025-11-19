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
            upperName: 'Both'
        },
        {
            name: 'core',
            upperName: 'Core'
        },
        {
            name: 'task',
            upperName: 'Task'
        }
    ]
    let funcsCodes = ['// @generated']
    for (const { name, upperName } of areas) {
        const isBoth = name === 'both'
        const states = readBaseNames(`src/${name}/states/*`)
        const funcs = readBaseNames(`src/${name}/funcs/*`)

        const codes = [
            '// @generated',
            "import { ResolveMethods } from '@both/types/types'",
            !isBoth && "import { MakePromiseReturn } from '@both/types/types'",
            states.map((state) => {
                return `import { ${state} } from '@${name}/states/${state}'`
            }),
            funcs.map((func) => {
                return `import { ${func} } from '@${name}/funcs/${func}'`
            }),
            `export const ${name}States = { ${states} }`,
            `export type ${upperName}States = ResolveMethods<typeof ${name}States>`,
            `export const ${name}Funcs = { ${funcs} }`,
            `export type ${upperName}Funcs = typeof ${name}Funcs`,
            !isBoth && `export type ${upperName}AsyncFuncs = {`,
            !isBoth && funcs.map((func) => `${func}: MakePromiseReturn<typeof ${func}>`),
            !isBoth && '}'
        ]
        const code = codes.flat().filter(Boolean).join('\n').replace(/^ +/gm, '')
        writeFileSync(`src/${name}/store/store.ts`, code)

        funcsCodes.push(
            `export const ${name}FuncNames: readonly string[] = Object.freeze([`,
            funcs.map((func) => `'${func}'`).join(','),
            '])'
        )
    }

    const funcsCode = funcsCodes.join('\n')
    writeFileSync('src/both/constants/funcNames.ts', funcsCode)
}
