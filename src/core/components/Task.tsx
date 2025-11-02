interface TaskProps {
    task: Task
}

function Task({ task }: TaskProps): ReactNode {
    const [html, setHtml] = useState<string>('')
    const [js, setJs] = useState<string | undefined>()
    const [css, setCss] = useState<string | undefined>()

    const [dragging, setDragging] = useState<boolean>(false)
    const dragControl = useDragControls()

    const mountRef = useRef<HTMLDivElement | null>(null)
    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    const noIframe = useMemo<boolean>(() => {
        return task.type === AppTypeName.OS || task.type === AppTypeName.Core
    }, [task.type])

    const handleHeaderPointerDown = (event: ReactPointerEvent): void => {
        if (!isSelfEvent(event)) return
        if (task.fullscreen || task.maximized) return
        dragControl.start(event)
    }

    useAsyncEffect(async () => {
        let tsx: string
        let css: string
        tsx = await readFile(`${task.path}/app.tsx`)
        try {
            css = await readFile(`${task.path}/app.css`)
        } catch {
            css = ''
        }

        if (noIframe) {
            tsx = `${tsx}; ${task.name}`
            const js: string = typescript.transpile(tsx, compilerOptions)
            setJs(js)
            setCss(css)
        } else {
            const codePlaceholderRegex: RegExp = /__([\w.]+)__|\{\{([\w.]+)\}\}/g
            tsx = taskTsx.replace(codePlaceholderRegex, (_, jsVarName) => {
                return eval(jsVarName)
            })
            tsx =
                bothConstantsTs +
                taskConstantsTs +
                bothStatesTs +
                taskStatesTs +
                //
                bothComponentsTs +
                bothHooksTs +
                bothFuncsTs +
                bothHelpersTs +
                bothStoreTs +
                //
                taskComponentsTs +
                taskHooksTs +
                taskFuncsTs +
                taskHelpersTs +
                taskStoreTs +
                //
                bothTsx +
                tsx
            const js: string = typescript.transpile(tsx, compilerOptions)
            css = bothCss + taskCss + css
            let html: string = taskHtml.replace(
                codePlaceholderRegex,
                (_, jsVarName, cssVarName) => {
                    return eval(jsVarName || cssVarName)
                }
            )
            setHtml(html)
        }
    }, [])

    useEffect(() => {
        if (noIframe) return
        const contentWindow = iframeRef?.current?.contentWindow
        if (!contentWindow) return
        const postMessageFunc = contentWindow.postMessage.bind(contentWindow)
        task.postMessage = ref(postMessageFunc)
    }, [iframeRef.current])

    useEffect(() => {
        if (noIframe) return
        const iframe = iframeRef.current
        if (html === '' || iframe === null) return
        iframe.sandbox.add(
            'allow-downloads',
            'allow-forms',
            'allow-orientation-lock',
            'allow-pointer-lock',
            'allow-popups',
            'allow-popups-to-escape-sandbox',
            'allow-presentation',
            'allow-scripts',
            'allow-storage-access-by-user-activation'
        )
        iframe.srcdoc = html
        setHtml('')
    }, [html, iframeRef.current])

    useAsyncEffect(async () => {
        if (!noIframe) return
        if (js === undefined || css === undefined || mountRef.current === null) return
        const component = await eval(js)(task)
        const root = ReactDOM.createRoot(mountRef.current)
        root.render(React.createElement(component))
        setJs(undefined)
        setCss(undefined)
    }, [js, css, mountRef.current])

    useEffect(() => {
        // if (task.fullscreen && task.type !== AppTypeName.OS) {
        //     task.fullscreen = false
        // }
    }, [task.fullscreen])

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
                {React.createElement(noIframe ? motion.div : motion.iframe, {
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
