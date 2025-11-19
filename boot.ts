const Paths: Record<string, string[]> = await fetch('paths.json').then((res) => res.json())

const srcPaths = Paths['/src/{both,core,task}/**/*.{tsx,ts}']
const srcCodes: [string, string][] = await Promise.all(
    srcPaths.map(async (path) => {
        return [
            path.replace(/\.tsx?$/, ''), //
            await fetch(path).then((res) => res.text())
        ]
    })
)

async function fetchText(paths: string[] | string): Promise<string> {
    if (!Array.isArray(paths)) {
        paths = [paths]
    }
    const val = await Promise.all(
        paths.map((path) => {
            return fetch(path).then((res) => res.text())
        })
    )
    return val.join('\n')
}

const [bothCss, coreCss] = await Promise.all([
    fetchText(Paths['/src/both/**/*.css']),
    fetchText(Paths['/src/core/**/*.css'])
])

const css = bothCss + coreCss

const style = document.getElementById('os-css')!
style.textContent = css

const templHtmlPath = '/src/task/templ.html'
let templHtml: string = await fetchText(templHtmlPath)

const liveServerInjectedScriptTagRegex = /<!-- Code injected by live-server -->.+<\/script>/s
templHtml = templHtml.replace(liveServerInjectedScriptTagRegex, '')

const result = await buildCode('@core/script', srcCodes, false)
const code = result.outputFiles?.[0].text
if (code === undefined) {
    throw Error('Build code xảy ra lỗi')
}

const script = document.createElement('script')
script.type = 'module'
script.text = code
document.body.appendChild(script)

window.Paths = Paths
window.srcCodes = srcCodes
window.bothCss = bothCss
window.templHtml = templHtml

export {}
