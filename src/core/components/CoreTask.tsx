import { Button } from '@both/components/Button'
import { Icon } from '@both/components/Icon'
import { clamp } from '@both/funcs/clamp'
import { clsx } from '@both/funcs/clsx'
import { isSelfEvent } from '@both/funcs/isSelfEvent'
import { ref } from '@both/funcs/ref'
import { AppTypeName } from '@both/states/appTypes'
import { ColorName } from '@both/states/colors'
import { SizeName } from '@both/states/sizes'
import { Task } from '@both/states/tasks'
import { VibeOS } from '@core/components/VibeOS'
import { maximize } from '@core/funcs/maximize'
import { readFile } from '@core/funcs/readFile'
import { extractImportmapFromHtml, Importmap } from '@core/helpers/extractImportmapFromHtml'
import { desktop } from '@core/states/desktop'
import { useAsyncEffect } from 'ahooks'
import { motion, useDragControls } from 'motion/react'
import { createElement, PointerEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

interface TaskProps {
    task: Task
}

export function CoreTask({ task }: TaskProps): ReactNode {
    const [html, setHtml] = useState<string>('')

    const [dragging, setDragging] = useState<boolean>(false)
    const dragControl = useDragControls()

    const mountRef = useRef<HTMLDivElement | null>(null)
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    const noIframe = useMemo<boolean>(() => {
        return task.type === AppTypeName.OS || task.type === AppTypeName.Core
    }, [task.type])

    const handleHeaderPointerDown = (event: PointerEvent): void => {
        if (!isSelfEvent(event)) return
        if (task.fullscreen || task.maximized) return
        dragControl.start(event)
    }

    useAsyncEffect(async () => {
        if (noIframe) return
        const codePlaceholderRegex: RegExp = /__([\w.]+)__|\{\{([\w.]+)\}\}/g
        let tsx: string
        let css: string
        let importmapHtml: string
        tsx = await readFile(`${task.path}/app.tsx`)
        try {
            css = await readFile(`${task.path}/app.css`)
        } catch {
            css = ''
        }
        try {
            importmapHtml = await readFile(`${task.path}/index.html`)
        } catch {
            importmapHtml = ''
        }
        const taskEntryPath = '/src/task/script'
        const taskEntry = srcCodes.find((entry) => entry[0] === taskEntryPath)!
        const taskEntryInjectVars = {
            secretId: task.secretId
        }
        const taskEntryCode = taskEntry[1].replace(codePlaceholderRegex, (_, jsVarName) => {
            return taskEntryInjectVars[jsVarName as keyof typeof taskEntryInjectVars]
        })
        const injectedSrcCodes = srcCodes.map<[string, string]>((entry) => {
            if (entry[0] === '/src/task/components/App') {
                return [entry[0], tsx]
            }
            if (entry[0] === taskEntryPath) {
                return [taskEntryPath, taskEntryCode]
            }
            return entry
        })
        const result = await buildCode('@task/script', injectedSrcCodes)
        const js = result.outputFiles?.[0].text
        if (js === undefined) {
            throw Error(`Ứng dụng lỗi: ${result.errors}`)
        }
        css = bothCss + css
        let importmapJson: string = ''
        if (importmapHtml) {
            const importmap: Importmap = extractImportmapFromHtml(importmapHtml)
            importmapJson = JSON.stringify(importmap)
        }
        const htmlInjectVars = { js, css, importmapJson }
        let html: string = templHtml.replace(codePlaceholderRegex, (_, jsVarName, cssVarName) => {
            return htmlInjectVars[(jsVarName || cssVarName) as keyof typeof htmlInjectVars]
        })
        setHtml(html)
    }, [])

    useEffect(() => {
        if (!noIframe) return
        if (mountRef.current === null) return
        const root = createRoot(mountRef.current)
        root.render(<VibeOS />)
        return () => {
            root.unmount()
        }
    }, [])

    useEffect(() => {
        if (noIframe) return
        const contentWindow = iframeRef.current?.contentWindow
        if (!contentWindow) return
        const postMessageFunc = contentWindow.postMessage.bind(contentWindow)
        task.postMessage = ref(postMessageFunc)
    }, [])

    useEffect(() => {
        if (noIframe) return
        const iframe = iframeRef.current
        if (html === '' || iframe === null) return
        iframe.allow = ['storage-access'].join(',')
        iframe.sandbox.add(
            'allow-downloads',
            'allow-forms',
            'allow-orientation-lock',
            'allow-pointer-lock',
            'allow-popups',
            'allow-popups-to-escape-sandbox',
            'allow-presentation',
            'allow-same-origin',
            'allow-scripts',
            'allow-storage-access-by-user-activation'
        )
        iframe.srcdoc = html
        setHtml('')
    }, [html])

    const taskRect = useMemo(() => {
        return {
            x: task.fullscreen || task.maximized ? 0 : task.x,
            y: task.fullscreen || task.maximized ? 0 : task.y,
            width: task.fullscreen || task.maximized ? '100%' : task.width,
            height: task.fullscreen || task.maximized ? '100%' : task.height
        }
    }, [task.fullscreen, task.maximized, task.x, task.y, task.width, task.height])

    return (
        <motion.div
            className="absolute flex flex-col bg-neutral-800"
            initial={{
                ...taskRect,
                borderRadius: task.fullscreen ? 0 : 8,
                scale: task.fullscreen ? 1 : 0.9
            }}
            animate={{
                ...taskRect,
                borderRadius: task.fullscreen || task.maximized ? 0 : undefined,
                scale: 1
            }}
            transition={{
                type: 'spring',
                duration: 0.5,
                stiffness: 400,
                damping: 25
            }}
            drag
            dragControls={dragControl}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{
                left: desktop.x,
                top: desktop.y,
                right: desktop.width - task.width,
                bottom: desktop.height - task.height
            }}
            dragTransition={{
                bounceStiffness: 1200
            }}
            dragElastic={0.25}
            onDragStart={() => {
                setDragging(true)
            }}
            onDragEnd={(_, info) => {
                task.x += info.offset.x
                task.y += info.offset.y
                task.x = clamp(task.x, desktop.x, desktop.width - task.width)
                task.y = clamp(task.y, desktop.y, desktop.height - task.height)
                setDragging(false)
            }}
        >
            <motion.div
                className="flex items-center gap-2 overflow-hidden"
                initial={{
                    height: task.noHeader || task.fullscreen ? 0 : undefined,
                    padding: task.noHeader || task.fullscreen ? 0 : 8
                }}
                animate={{
                    height: task.fullscreen ? 0 : undefined,
                    padding: task.fullscreen ? 0 : undefined
                }}
                onPointerDown={handleHeaderPointerDown}
            >
                <div className="pointer-events-none w-32" />

                <div className="pointer-events-none flex-1 text-center">
                    <Icon name={task.icon} /> {task.title}
                </div>

                <div className="flex w-32 items-center justify-end gap-1">
                    <Button size={SizeName.Sm}>_</Button>
                    <Button
                        size={SizeName.Sm}
                        onClick={() => {
                            maximize(task.id)
                        }}
                    >
                        +
                    </Button>
                    <Button size={SizeName.Sm} color={ColorName.Red}>
                        x
                    </Button>
                </div>
            </motion.div>

            <motion.div
                className="flex-1 bg-neutral-800"
                initial={{
                    padding: task.fullscreen ? 0 : task.noHeader ? 8 : '0 8px 8px',
                    borderRadius: '0 0 8px 8px'
                }}
                animate={{
                    padding: task.fullscreen || task.maximized ? 0 : undefined,
                    borderRadius: task.fullscreen || task.maximized ? 0 : undefined
                }}
            >
                {createElement(noIframe ? motion.div : motion.iframe, {
                    ref: (noIframe ? mountRef : iframeRef) as any,
                    className: clsx(
                        'h-full w-full bg-neutral-900',
                        dragging && 'pointer-events-none'
                    ),
                    initial: {
                        borderRadius: 6
                    },
                    animate: {
                        borderRadius: task.fullscreen || task.maximized ? 0 : undefined
                    }
                })}
            </motion.div>

            <div className="absolute -bottom-1 -z-1 h-4 w-full rounded-b-lg bg-neutral-950" />
            <div className="absolute -bottom-0.5 -z-1 h-4 w-full rounded-b-lg bg-neutral-600" />
        </motion.div>
    )
}
