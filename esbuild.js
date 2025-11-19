import { default as esbuild } from 'esbuild-wasm'

const wasmURL = 'https://esm.sh/esbuild-wasm@0.25.12/esbuild.wasm'
await esbuild.initialize({ wasmURL })

/**
 * @param {[string, string][]} fileCodes
 * @param {boolean} isTaskSide
 * @returns {import('esbuild-wasm').Plugin}
 */
function esbuildVibeOSPlugin(fileCodes, isTaskSide) {
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
                    if (path === '/src/both/status/messenger') {
                        throw Error(`Không được phép import "${path}"`)
                    }
                }
                if (path[0] === '/') {
                    return { path, namespace: 'vibeos' }
                }
                return { path, external: true }
            })
            build.onLoad({ filter: /.*/, namespace: 'vibeos' }, ({ path }) => {
                const dir = path.split('/').slice(0, -1).join('/') || '/'
                let code = fileCodes.find(([fileCodePath]) => {
                    return fileCodePath === path
                })[1]
                if (isTaskSide) {
                    const isCorePath = /^\/src\/core\b/.test(path)
                    if (isCorePath) code = ''
                } else {
                    const isTaskPath = /^\/src\/task\b/.test(path)
                    if (isTaskPath) code = ''
                }
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
 * @param {boolean} isTaskSide
 */
export function buildCode(entryPoints, fileCodes, isTaskSide) {
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
        plugins: [esbuildVibeOSPlugin(fileCodes, isTaskSide)]
    })
}

window.transformCode = transformCode
window.buildCode = buildCode
