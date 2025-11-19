import { Obj } from '@both/types/types'
import { BuildResult, TransformResult } from 'esbuild-wasm'

declare global {
    function transformCode(code: string): Promise<TransformResult>

    function buildCode(
        entryPoints: string | string[],
        fileCodes: [string, string][],
        isTaskSide: boolean
    ): Promise<BuildResult>

    const Paths: Obj<string[]>
    const srcCodes: [string, string][]
    const bothCss: string
    const templHtml: string

    interface Window {
        transformCode: typeof transformCode
        buildCode: typeof buildCode
        Paths: typeof Paths
        srcCodes: typeof srcCodes
        bothCss: typeof bothCss
        templHtml: typeof templHtml
    }
}
