async function FileManager(ts: Task) {
    interface Position {
        x: number
        y: number
    }

    const { filesize } = (await import('https://esm.sh/filesize')) as any

    const { isDesktop, path, viewMode } = ts.getArgs({
        isDesktop: yup.bool().default(false),
        path: yup.string().transform(normPath).default('/'),
        viewMode: yup.mixed<'list' | 'tiles'>().oneOf(['list', 'tiles']).default('list')
    })

    function App(): ReactNode {
        const hist = useHistoryTravel(normPath(path), 1000)
        const [selectedEnts, setSelectedEnts] = useSet<Ent>()
        const [selectAnchor, setSelectAnchor] = useState<Position | undefined>(undefined)
        const [selectCurrent, setSelectCurrent] = useState<Position | undefined>(undefined)

        const req = useRequest(async () => {
            if (hist.value === undefined) return
            console.log(3)
            return ts.readDir(hist.value)
        })

        const selectRect = useMemo<DOMRect | undefined>(() => {
            if (selectAnchor === undefined || selectCurrent === undefined) return
            const x = Math.min(selectAnchor.x, selectCurrent.x)
            const y = Math.min(selectAnchor.y, selectCurrent.y)
            const width = Math.abs(selectAnchor.x - selectCurrent.x)
            const height = Math.abs(selectAnchor.y - selectCurrent.y)
            return new DOMRect(x, y, width, height)
        }, [selectAnchor, selectCurrent])

        const handleContentPointerDown = (event: ReactPointerEvent): void => {
            event.currentTarget.setPointerCapture(event.pointerId)
            setSelectAnchor({
                x: event.clientX,
                y: event.clientY
            })
        }

        const handleContentPointerMove = (event: ReactPointerEvent): void => {
            if (!selectAnchor) return
            setSelectCurrent({
                x: event.clientX,
                y: event.clientY
            })
        }

        const handleContentPointerUp = (): void => {
            setSelectAnchor(undefined)
            setSelectCurrent(undefined)
        }

        return (
            <div className="column h-full">
                {!isDesktop && (
                    <div className="row z-1 gap-2 bg-zinc-900 p-2 pb-0">
                        <InputGroup>
                            <Button icon="arrow-left" disabled={hist.backLength <= 0} />
                            <Button icon="arrow-right" disabled={hist.forwardLength <= 0} />
                            <Button
                                icon="arrow-up"
                                disabled={hist.value === undefined || hist.value === '/'}
                            />
                        </InputGroup>

                        <Button icon="reload" onClick={() => req.refresh()} />

                        <form className="flex-1">
                            <TextInput
                                fill
                                value={hist.value}
                                rightElement={<Button type="submit" icon="key-enter" />}
                            />
                        </form>
                    </div>
                )}

                <div
                    className="relative flex-1 overflow-hidden p-2"
                    onPointerDown={handleContentPointerDown}
                    onPointerMove={handleContentPointerMove}
                    onPointerUp={handleContentPointerUp}
                >
                    <Table className="h-full overflow-auto">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Kích thước</th>
                                <th>Ngày sửa đổi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {req.data?.map((ent) => (
                                <tr key={ent.path}>
                                    <td>{ent.name}</td>
                                    <td>{ent.isFile ? filesize(ent.size) : '-'}</td>
                                    <td>{formatTime(ent.mtime, 'DD-MM-YYYY HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {selectRect && (
                    <div
                        className="pointer-events-none absolute rounded bg-blue-500/10 outline-2 outline-blue-500"
                        style={{
                            left: selectRect.x,
                            top: selectRect.y,
                            width: selectRect.width,
                            height: selectRect.height
                        }}
                    />
                )}
            </div>
        )
    }
    return App
}
