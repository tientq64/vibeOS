async function FileManager() {
    interface Position {
        x: number
        y: number
    }

    const { filesize } = (await import('https://esm.sh/filesize')) as any

    function App(): ReactNode {
        const hist = useHistoryTravel('/C', 1000)
        const [selectedEnts, setSelectedEnts] = useSet<Ent>()
        const [selectAnchor, setSelectAnchor] = useState<Position | undefined>(undefined)
        const [selectCurrent, setSelectCurrent] = useState<Position | undefined>(undefined)

        const req = useRequest(async () => {
            if (hist.value === undefined) return
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

        const handleAppPointerDown = (event: ReactPointerEvent): void => {
            event.currentTarget.setPointerCapture(event.pointerId)
            setSelectAnchor({
                x: event.clientX,
                y: event.clientY
            })
        }

        const handleAppPointerMove = (event: ReactPointerEvent): void => {
            if (!selectAnchor) return
            setSelectCurrent({
                x: event.clientX,
                y: event.clientY
            })
        }

        const handleAppPointerUp = (event: ReactPointerEvent): void => {
            setSelectAnchor(undefined)
            setSelectCurrent(undefined)
        }

        return (
            <div
                className="column h-full"
                onPointerDown={handleAppPointerDown}
                onPointerMove={handleAppPointerMove}
                onLostPointerCapture={handleAppPointerUp}
            >
                <div className="row gap-2 p-2 pb-0">
                    <InputGroup>
                        <Button icon="arrow-left" disabled={hist.backLength <= 0} />
                        <Button icon="arrow-right" disabled={hist.forwardLength <= 0} />
                        <Button
                            icon="arrow-up"
                            disabled={hist.value === undefined || hist.value === '/'}
                        />
                    </InputGroup>

                    <Button icon="reload" />

                    <form className="flex-1">
                        <TextInput
                            fill
                            value={hist.value}
                            rightElement={<Button type="submit" icon="key-enter" />}
                        />
                    </form>
                </div>

                <div className="flex-1 p-2">
                    <Table>
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
                                    <td>{filesize(ent.size)}</td>
                                    <td>{formatTime(ent.mtime, 'DD-MM-YYYY HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {selectRect && (
                    <div
                        className="absolute bg-blue-500/10 outline-2 outline-blue-500"
                        style={{
                            left: selectRect.x,
                            top: selectRect.y,
                            width: selectRect.width,
                            height: selectRect.height
                        }}
                    ></div>
                )}
            </div>
        )
    }
    return App
}
