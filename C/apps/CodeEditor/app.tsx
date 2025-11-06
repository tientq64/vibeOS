import { ReactNode, useEffect, useRef } from 'react'

const { Workspace, init } = await import('modern-monaco')

const workspace = new Workspace({
    initialFiles: {
        'index.html': `
                <!doctype html>
                <html>
                    <head>
                        <script type="importmap">
                            {
                                "imports": {
                                    "filesize": "https://esm.sh/filesize"
                                }
                            }
                        \x3c/script>
                    </head>
                </html>
            `,
        'index.ts': `
                (async function() {
                    const filesize = await import('filesize')
                    const result: Result = filesize(1024 * 64) // 64 KB
                })()
            `,
        'types.ts': `
                type Result = string
            `
    }
})

const monaco = await init({
    langs: ['typescript'],
    theme: 'kanagawa-wave',
    lsp: {
        typescript: {
            compilerOptions: {
                strict: true,
                lib: ['ESNext', 'DOM', 'DOM.Iterable'],
                target: 99,
                module: 99,
                moduleResolution: 99,
                forceConsistentCasingInFileNames: true,
                esModuleInterop: true,
                noEmit: true,
                checkJs: false,
                allowUmdGlobalAccess: true
            }
        }
    },
    workspace
})
let editor

export function App(): ReactNode {
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (editorRef.current === null) return
        editor = monaco.editor.create(editorRef.current, {
            fontFamily: 'VibeOS',
            fontSize: 16,
            theme: 'kanagawa-wave'
        })
        workspace.openTextDocument('index.ts')
    }, [editorRef.current])

    return (
        <div className="column h-full">
            <div className="border-b-2">Menubar</div>

            <div className="row flex-1 items-stretch">
                <div className="w-60 border-r-2">File tree</div>

                <div className="column min-w-0 flex-1">
                    <div>Tabs</div>

                    <div className="flex-1" ref={editorRef}></div>
                </div>
            </div>
        </div>
    )
}
