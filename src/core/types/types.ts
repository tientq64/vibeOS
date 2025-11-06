import { Obj } from '@both/types/types'
import { BuildResult, TransformResult } from 'esbuild-wasm'

declare global {
    function transformCode(code: string): Promise<TransformResult>

    function buildCode(
        entryPoints: string | string[],
        fileCodes: [string, string][]
    ): Promise<BuildResult>

    const Paths: Obj<string[]>
    const srcCodes: [string, string][]
    const bothCss: string
    const templHtml: string
}
