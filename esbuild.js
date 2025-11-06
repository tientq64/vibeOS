import { default as esbuild } from 'esbuild-wasm'

const wasmURL = 'https://esm.sh/esbuild-wasm@0.25.12/esbuild.wasm'
await esbuild.initialize({ wasmURL })

/**
 * @param {[string, string][]} fileCodes
 * @returns {import('esbuild-wasm').Plugin}
 */
function esbuildVibeOSPlugin(fileCodes) {
    return {
        name: 'vibeos',
        setup(build) {
            build.onResolve({ filter: /.*/ }, ({ path, resolveDir, importer }) => {
                if (path[0] === '.') {
                    path = new URL(path, `file://${resolveDir}/`).pathname
                } else if (/^@(both|core|task|root)\//.test(path)) {
                    path = path //
                        .replace(/^@(both|core|task)\//, '/src/$1/')
                        .replace(/^@root\//, '/')
                }
                if (importer === '/src/task/components/App') {
                    if (path === '/src/task/constants/secret') {
                        throw Error(`Không được phép import "${path}"`)
                    }
                }
                if (path[0] === '/') {
                    return { path, namespace: 'vibeos' }
                }
                return { path, external: true }
            })
            build.onLoad({ filter: /.*/, namespace: 'vibeos' }, (args) => {
                const dir = args.path.split('/').slice(0, -1).join('/') || '/'
                const code = fileCodes.find(([path]) => {
                    return path === args.path
                })[1]
                return {
                    contents: code,
                    loader: 'tsx',
                    resolveDir: dir
                }
            })
        }
    }
}

/**
 * @param {string} code
 */
export async function transformCode(code) {
    return esbuild.transform(code, {
        format: 'esm',
        target: ['esnext'],
        loader: 'tsx',
        jsx: 'automatic',
        minify: true,
        treeShaking: true
    })
}

/**
 * @param {string | string[]} entryPoints
 * @param {[string, string][]} fileCodes
 */
export function buildCode(entryPoints, fileCodes) {
    if (typeof entryPoints === 'string') {
        entryPoints = [entryPoints]
    }
    return esbuild.build({
        entryPoints,
        bundle: true,
        minify: true,
        treeShaking: true,
        write: false,
        format: 'esm',
        target: ['esnext'],
        jsx: 'automatic',
        plugins: [esbuildVibeOSPlugin(fileCodes)]
    })
}

window.transformCode = transformCode
window.buildCode = buildCode
