let Paths: Obj<string[]>

let bothConstantsTs: string
let coreConstantsTs: string
let taskConstantsTs: string
let bothStatesTs: string
let coreStatesTs: string
let taskStatesTs: string
let bothComponentsTs: string
let coreComponentsTs: string
let taskComponentsTs: string
let bothHooksTs: string
let coreHooksTs: string
let taskHooksTs: string
let bothFuncsTs: string
let coreFuncsTs: string
let taskFuncsTs: string
let bothHelpersTs: string
let coreHelpersTs: string
let taskHelpersTs: string
let bothStoreTs: string
let coreStoreTs: string
let taskStoreTs: string
let bothTsx: string
let coreTsx: string
let taskTsx: string
let bothCss: string
let coreCss: string
let taskCss: string
let taskHtml: string

async function boot(): Promise<void> {
    Paths = await (await fetch('./src/paths.json')).json()

    const globsMap: string[][] = [
        Paths['/src/both/constants/*'],
        Paths['/src/core/constants/*'],
        Paths['/src/task/constants/*'],
        Paths['/src/both/states/*'],
        Paths['/src/core/states/*'],
        Paths['/src/task/states/*'],
        Paths['/src/both/components/*'],
        Paths['/src/core/components/*'],
        Paths['/src/task/components/*'],
        Paths['/src/both/hooks/*'],
        Paths['/src/core/hooks/*'],
        Paths['/src/task/hooks/*'],
        Paths['/src/both/funcs/*'],
        Paths['/src/core/funcs/*'],
        Paths['/src/task/funcs/*'],
        Paths['/src/both/helpers/*'],
        Paths['/src/core/helpers/*'],
        Paths['/src/task/helpers/*'],
        Paths['/src/both/store/*'],
        Paths['/src/core/store/*'],
        Paths['/src/task/store/*'],
        ['/src/both/script.tsx', '/src/both/style.css'],
        ['/src/core/script.tsx', '/src/core/style.css'],
        ['/src/task/script.tsx', '/src/task/style.css'],
        ['/src/task/templ.html']
    ]
    const result = await Promise.all(
        globsMap.map((globs) => {
            return Promise.all(
                globs.map((glob) => {
                    return fetch(glob).then((res) => res.text())
                })
            )
        })
    )

    bothConstantsTs = result[0].join('\n')
    coreConstantsTs = result[1].join('\n')
    taskConstantsTs = result[2].join('\n')
    bothStatesTs = result[3].join('\n')
    coreStatesTs = result[4].join('\n')
    taskStatesTs = result[5].join('\n')
    bothComponentsTs = result[6].join('\n')
    coreComponentsTs = result[7].join('\n')
    taskComponentsTs = result[8].join('\n')
    bothHooksTs = result[9].join('\n')
    coreHooksTs = result[10].join('\n')
    taskHooksTs = result[11].join('\n')
    bothFuncsTs = result[12].join('\n')
    coreFuncsTs = result[13].join('\n')
    taskFuncsTs = result[14].join('\n')
    bothHelpersTs = result[15].join('\n')
    coreHelpersTs = result[16].join('\n')
    taskHelpersTs = result[17].join('\n')
    bothStoreTs = result[18].join('\n')
    coreStoreTs = result[19].join('\n')
    taskStoreTs = result[20].join('\n')
    bothTsx = result[21][0]
    coreTsx = result[22][0]
    taskTsx = result[23][0]
    bothCss = result[21][1]
    coreCss = result[22][1]
    taskCss = result[23][1]
    taskHtml = result[24][0].replace(/<!-- Code injected by live-server -->.+<\/script>/s, '')

    coreTsx =
        bothConstantsTs +
        coreConstantsTs +
        bothStatesTs +
        coreStatesTs +
        //
        bothComponentsTs +
        bothHooksTs +
        bothFuncsTs +
        bothHelpersTs +
        bothStoreTs +
        //
        coreComponentsTs +
        coreHooksTs +
        coreFuncsTs +
        coreHelpersTs +
        coreStoreTs +
        //
        bothTsx +
        coreTsx
    const coreJs: string = typescript.transpile(coreTsx, compilerOptions)
    eval(coreJs)

    coreCss = bothCss + coreCss
    document.getElementById('os-css')!.textContent = coreCss
}
boot()
